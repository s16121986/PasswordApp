const pagePath = 'index.html';
const extensionUrl = chrome.runtime.getURL(pagePath);

export default class Tab {
	async sendMessage(data) {
		let tab = await this.find();
		if (!tab)
			tab = await this.openInstance({active: false});

		return await new Promise((resolve, reject) => {
			chrome.tabs.sendMessage(tab.id, data, (response) => {
				//console.log(arguments);
				resolve(response);
			});
		});/**/

		/*const tab = await this.activate();
		const port = chrome.tabs.connect(tab.id, {name: "knockknock"});
		port.postMessage({type: 'init', extensionId: chrome.runtime.id});
		port.onMessage.addListener(function(msg) {
			console.log(arguments)
		});*/
		//chrome.tabs.connect(id);
		//self.sendMessage({type: 'init', extensionId: chrome.runtime.id});
	}

	find() {
		return new Promise((resolve, reject) => {
			chrome.tabs.query({url: extensionUrl}, tabs => {
				resolve(tabs.length > 0 ? tabs[0] : null);
			});
		});
	}

	async isOpened() { return !!(await this.find()); }

	async focus() {
		const tab = await this.find();
		if (!tab)
			return false;

		chrome.tabs.update(tab.id, {selected: true});

		return true;
	}

	open(params) {
		return new Promise((resolve, reject) => {
			chrome.tabs.create(Object.assign({
				active: true,
				pinned: true,
				index: 1,
				url: pagePath
			}, params), (tab) => { resolve(tab); });
		});
	}

	async openInstance() {
		let tab = await this.find();

		if (tab)
			chrome.tabs.update(tab.id, {selected: true});
		else
			tab = await this.open();

		return tab;
	}
}

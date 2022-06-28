export default class Tab {
	sendMessage(data) {
		return new Promise((resolve, reject) => {
			chrome.tabs.sendMessage(this.id, data, function (response) {
				//console.log(arguments);
				resolve(response);
			});
		});
	}

	isOpened() { return this.id !== undefined; }

	focus() { chrome.tabs.update(this.id, {selected: true}); }

	create() {
		return new Promise((resolve, reject) => {
			chrome.tabs.create({
				active: true,
				pinned: true,
				index: 1,
				url: "index.html"//app('basePath') +
			}, (tab) => {
				this.id = tab.id;

				resolve();
				/*const port = chrome.tabs.connect(id, {name: "knockknock"});
				port.postMessage({type: 'init', extensionId: chrome.runtime.id});
				port.onMessage.addListener(function(msg) {
					console.log(arguments)
				});*/
				//chrome.tabs.connect(id);
				//self.sendMessage({type: 'init', extensionId: chrome.runtime.id});
			});
		});
	}

	open() {
		if (!this.isOpened())
			return this.create();

		return new Promise((resolve, reject) => {
			chrome.tabs.get(this.id, async (tab) => {
				if (tab)
					this.focus();
				else
					await this.create();

				resolve();
			});
		});
	}
}

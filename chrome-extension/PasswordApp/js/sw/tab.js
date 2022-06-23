module.exports = new function () {
	const self = this;
	let id = null;

	this.sendMessage = function (data, callback) {
		chrome.tabs.sendMessage(id, data, function (response) {
			//console.log(arguments);
			if (callback)
				callback(response);
		});
	};
	this.sendContent = function (content, callback) {
		self.sendMessage({
			type: 'content',
			content: content
		}, callback);
	};
	this.isOpened = function () { return id !== null; };
	this.focus = function () {
		chrome.tabs.update(id, {selected: true});
	};
	this.create = function () {
		chrome.tabs.create({
			active: true,
			pinned: true,
			index: 1,
			url: basePath + "index.html"
		}, function (tab) {
			id = tab.id;

			/*const port = chrome.tabs.connect(id, {name: "knockknock"});
			port.postMessage({type: 'init', extensionId: chrome.runtime.id});
			port.onMessage.addListener(function(msg) {
				console.log(arguments)
			});*/
			//chrome.tabs.connect(id);
			//self.sendMessage({type: 'init', extensionId: chrome.runtime.id});
		});
	};
	this.open = function () {
		if (!this.isOpened())
			return this.create();

		chrome.tabs.get(id, function (tab) {
			if (tab)
				self.focus();
			else
				self.create();
		});
	};
};
const extensionId = chrome.runtime.id;
const App = new app.App();
const desktop = App.getDesktop();
const storage = App.getStorage();
const desktopData = App.getData();

const notifyExtension = function (data, callback) {
	if (typeof data === 'string')
		data = {type: data};
	return chrome.runtime.sendMessage(extensionId, data, callback);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (sender.id !== extensionId)
		return;

	console.log(request)
	switch (request.type) {
		case 'store':
			storage.store(desktopData.toString(), 'none');
			break;
		case 'content':
			sendResponse({status: 'ok'});
			storage.store(request.content, request.encryption)
				.then(() => {
					//if (!storage.isReady())
					desktopData.fromStorage();
					desktop.update();
				});
			break;
		default:
			sendResponse({status: 'error'});
	}
});

notifyExtension({type: 'init'}, function (r) {
	desktop.init({container: '#notes-wrapper'});
});

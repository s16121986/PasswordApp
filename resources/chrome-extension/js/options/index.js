const extensionId = chrome.runtime.id;
const notifyExtension = function (data, callback) {
	if (typeof data === 'string')
		data = {type: data};
	return chrome.runtime.sendMessage(extensionId, data, callback);
};

document.addEventListener('DOMContentLoaded', function () { // Аналог $(document).ready(function(){
	const uploadInput = document.getElementById('form-file');
	uploadInput.onchange = function () {
		const file = uploadInput.files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			const content = reader.result;
			const m = content.match(/^data:(\w+),(.+)/);
			if (m) {
				notifyExtension({
					type: 'content',
					content: m[2],
					encryption: m[1]
				});
			} else {
				console.log('file invalid');
			}
		};
		console.log(arguments)
	};
});

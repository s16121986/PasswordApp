const extensionId = chrome.runtime.id;
const basePath = chrome.runtime.getURL('');
const scriptsPath = basePath + 'js/sw/';

/*function require(moduleName) {
	self.module = {exports: null};
	if (!moduleName.endsWith(".js"))
		moduleName += ".js";
	importScripts(scriptsPath + moduleName);
	return self.module.exports;
}*/
const encoder = {
	base64Encode: data => btoa(unescape(encodeURIComponent(data))),
	base64Decode: data => {
		try {
			return decodeURIComponent(escape(atob(data)));
		} catch (e) {
			return null;
		}
	}
}

function syncStore(key, data, callback) {
	let i = 0;
	const storeData = {};

	let temp = encoder.base64Encode(data);
	while (temp.length > 0) {
		const index = key + "_" + i++;

		// since the key uses up some per-item quota, see how much is left for the value
		// also trim off 2 for quotes added by storage-time `stringify`
		const valueLength = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - index.length - 2;

		// trim down segment so it will be small enough even when run through `JSON.stringify` again at storage time
		const segment = temp.substr(0, valueLength);
		//while(JSON.stringify(segment).length > valueLength)
		//	segment = temp.substr(0, --valueLength);

		storeData[index] = segment;
		temp = temp.substr(valueLength);
	}

	// store all the chunks
	chrome.storage.sync.set(storeData, () => {
		if (chrome.runtime.lastError)
			return console.log(chrome.runtime.lastError);

		console.log('Sync data saved');

		callback();
	});

	return true;
}

function syncRead(key, callback) {
	chrome.storage.sync.get(null, (items) => {
		if (chrome.runtime.lastError)
			return console.log(chrome.runtime.lastError);

		if (!items[key + '_0'])
			return;

		let i = 0;
		let data = '';
		do {
			data += items[key + '_' + i++];
		} while (items[key + '_' + i]);

		//console.log(data);

		const encoded = encoder.base64Decode(data);

		console.log('Sync data found');
		//console.log(encoded);

		callback(encoded);
	});

	return true;
}

function clear(name, resolve) {
	chrome.storage.sync.remove(name, () => {
		if (chrome.runtime.lastError)
			return console.log(chrome.runtime.lastError);

		resolve();
	});

	return true;
}

(function (global) {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (sender.id !== extensionId)
			return;

		//console.log(request, sender);

		switch (request.type) {
			case 'data-read':
				return syncRead('data', sendResponse);
			case 'data-store':
				return syncStore('data', request.data, sendResponse);
			case 'data-clear':
				return clear('data', sendResponse);
		}
	});

	//store('data', 'testdata', () => {});
	//clear('data', () => {});
	//retrieve('data', (data) => { console.log(data); });

})(self);
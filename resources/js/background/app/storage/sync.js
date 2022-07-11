function returnResolve(resolve, data) {
	if (undefined === data)
		resolve();
	else
		resolve(data);
}

function returnError(resolve, data) {
	console.error(chrome.runtime.lastError);

	returnResolve(resolve, data);
}

export default class Sync {
	store(key, data) {
		return new Promise((resolve, reject) => {
			let temp = data;
			let i = 0;
			const storeData = {};
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
					return returnError(resolve);

				console.log('Sync data saved');

				resolve();
			});
		});
	}

	read(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get(null, async (items) => {
				if (chrome.runtime.lastError)
					return returnError(resolve, null);

				if (!items[key + '_0'])
					return returnResolve(resolve, null);

				//console.log('Sync data found');

				let i = 0;
				let data = '';
				do {
					data += items[key + '_' + i++];
				} while (items[key + '_' + i]);

				resolve(data);
			});
		});
	}

	clear(key) {
		return new Promise(async (resolve, reject) => {
			chrome.storage.sync.get(null, async (items) => {
				if (chrome.runtime.lastError)
					return returnError(resolve);

				let removeKeys = [];
				let i = 0;
				while (items[key + '_' + i]) {
					removeKeys.push(key + '_' + i++);
				}

				if (removeKeys.length === 0)
					return returnResolve(resolve);

				chrome.storage.sync.remove(removeKeys, () => {
					if (chrome.runtime.lastError)
						return returnError(resolve);

					console.log('Sync data cleared');

					resolve();
				});
			});
		});
	}
}

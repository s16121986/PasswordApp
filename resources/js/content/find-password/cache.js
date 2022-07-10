export default class Cache {
	read() {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get('cache', result => {
				resolve(result.cache);
			});
		});
	}

	write(data) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.set({cache: data}, () => {
				resolve();
			});
		});
	}
};

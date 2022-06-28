function isExtension() { return chrome.runtime && chrome.runtime.id; }

const dataKey = 'data';

class Local {
	get() { return localStorage.getItem(dataKey); }

	retrieve() { return this.get(); }

	set(data) { localStorage.setItem(dataKey, data); }

	exists() { return !!localStorage.getItem(dataKey); }

	clear() { localStorage.removeItem(dataKey); }
}

class Remote {
	async set(data) { return await app('broadcast').send('data-store', data); }

	async get() { return await app('broadcast').send('data-read'); }

	async retrieve() { return await app('broadcast').send('data-retrieve'); }

	async exists() { return await app('broadcast').send('data-exists'); }

	async clear() { return await app('broadcast').send('data-clear'); }
}

export default class Sync {
	constructor() {
		this.storage = isExtension()//(chrome && chrome.storage)
			? new Remote()
			: new Local();
	}

	async set(data) {
		//const encoder = app('encoder');

		//const encrypted = await encoder.encrypt(data);

		return await this.storage.set(data);
	}

	async get() {
		return await this.storage.get();
		/*const encoder = app('encoder');

		const encrypted = await this.storage.get();
		if (!encrypted)
			return null;

		try {
			return await encoder.decrypt(encrypted);
		} catch (e) {
			console.error(e);
			return null;
		}*/
	}

	async retrieve() { return await this.storage.retrieve(); }

	async clear() { return await this.storage.clear(); }

	async exists() { return await this.storage.exists(); }
}

function isExtension() { return chrome.runtime && chrome.runtime.id; }

const dataKey = 'data';

class Local {
	get() { return localStorage.getItem(dataKey); }

	set(data) { localStorage.setItem(dataKey, data); }

	exists() { return !!localStorage.getItem(dataKey); }

	clear() { localStorage.removeItem(dataKey); }
}

class Remote {
	async set(data) { return await app('broadcast').send('data-store', data); }

	async get() { return await app('broadcast').send('data-read'); }

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
		const encoder = app('encoder');

		const encrypted = await encoder.encrypt(data);

		return await this.storage.set(encrypted);
	}

	async get() {
		const encoder = app('encoder');

		const encrypted = await this.storage.get();
		if (!encrypted)
			return null;

		return await encoder.decrypt(encrypted);
	}

	async clear() { return await this.storage.clear(); }

	async exists() { return await this.storage.exists(); }
}

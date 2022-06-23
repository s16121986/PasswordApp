function isExtension() { return !!chrome.runtime.id; }

class Local {
	get(name) { return localStorage.getItem(name); }

	set(name, data) { localStorage.setItem(name, data); }
}

class Remote {
	async set(name, data) {
		return chrome.runtime.sendMessage(chrome.runtime.id, {type: 'data-store', name: name, data: data});
	}

	async get(name) {
		return chrome.runtime.sendMessage(chrome.runtime.id, {type: 'data-read', name: name});
	}
}

export default class Sync {
	constructor() {
		this.storage = isExtension()//(chrome && chrome.storage)
			? new Remote()
			: new Local();
	}

	set(name, data) { this.storage.set(name, data); }

	get(name) { return this.storage.get(name); }
}

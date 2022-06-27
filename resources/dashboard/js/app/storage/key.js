export default class Key {
	constructor() {

	}

	async hash() { return await app('encoder').exportKey(); }

	async store() {
		if (!this.exists())
			return;

		const keyHash = await app('encoder').exportKey();

		localStorage.setItem('key', keyHash);
	}

	async load() {
		const keyHash = localStorage.getItem('key');

		if (keyHash)
			await app('encoder').importKey(keyHash);

		return keyHash;
	}

	exists() { return app('encoder').hasKey(); }
}

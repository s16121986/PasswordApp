export default class Key {
	async hash() { return await app('encoder').exportKey(); }

	async store() {
		if (!this.exists())
			return;

		const keyHash = await app('encoder').exportKey();

		await app('broadcast').send('key-import', keyHash);
		//localStorage.setItem('key', keyHash);
	}

	async load() {
		const keyHash = await app('broadcast').send('key-export');
		//const keyHash = localStorage.getItem('key');

		if (keyHash)
			await app('encoder').importKey(keyHash);

		return keyHash;
	}

	exists() { return app('encoder').hasKey(); }
}

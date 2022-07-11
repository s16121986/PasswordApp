/*function getStored() {
	return localStorage.getItem('key');
}

async function importKey(packedKey) {
	await app('encoder').importKey(packedKey);

	return app('encoder').hasKey() ? packedKey : null;
}

async function importStored() {
	const keyHash = getStored();
	if (!keyHash)
		return null;

	const flag = await importKey(keyHash);
	if (flag)
		return keyHash;

	localStorage.removeItem('key');

	return null;
}*/

export default class Key {
	async hash() { return await app('encoder').exportKey(); }

	async store() {
		if (!this.exists())
			return;

		const keyHash = await app('encoder').exportKey();

		//localStorage.setItem('key', keyHash);

		await app('broadcast').send('key-import', keyHash);
		//localStorage.setItem('key', keyHash);
	}

	async load() {
		//let keyHash = await importStored();
		const keyHash = await app('broadcast').send('key-export');

		if (keyHash)
			await app('encoder').importKey(keyHash);

		return keyHash;
	}

	exists() { return app('encoder').hasKey(); }

	clear() {

	}
}

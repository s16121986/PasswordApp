export default async function importKey(key) {
	if (!key || key === app('currentKey'))
		return;

	await app('encoder').importKey(key);

	if (app('encoder').hasKey()) {
		await app('encryptKey').store();

		app('currentKey', key);

		if (app('data').isEmpty())
			await app('data').load();
	}

	reload();
}

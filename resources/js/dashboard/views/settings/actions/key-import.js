export default async function importKey(key) {
	app('dashboard').setLoading(true);

	await app('broadcast').send('key-import', key);

	await app('data').load();

	app('dashboard').setLoading(false);
	/*if (!key || key === app('currentKey'))
		return;

	await app('encoder').importKey(key);

	if (app('encoder').hasKey()) {
		await app('encryptKey').store();

		app('currentKey', key);

		if (app('data').isEmpty())
			await app('data').load();
	}*/
}

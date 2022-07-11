function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => { resolve(reader.result); };
		reader.readAsText(file);
	});
}

/*async function importKey(key) {
	if (key && key !== app('currentKey'))
		await app('encoder').importKey(key);

	if (!app('encoder').hasKey())
		return false;

	await app('encryptKey').store();

	return true;
}*/

async function _import(file, key) {
	const keyFlag = await app('broadcast').send('key-import', key);
	//const keyFlag = await importKey(key);
	if (!keyFlag)
		throw 'Encrypt key required';

	const encodedData = await readFile(file);
	if (!encodedData)
		throw 'File content empty';

	await app('broadcast').send('data-import', encodedData);
	/*let data;
	try {
		const decrypted = await app('encoder').decrypt(encodedData);
		data = JSON.parse(decrypted);
	} catch (e) {
		throw e;
	}*/

	/*app('data').setData(data);

	await app('data').store();*/

	//reload();
}

export default async function importData(file, key) {
	app('dashboard').setLoading(true);

	try {
		await _import(file, key);
	} catch (e) {
		console.error(e);
	}

	await app('data').load();

	app('dashboard').update();

	app('dashboard').setLoading(false);
}

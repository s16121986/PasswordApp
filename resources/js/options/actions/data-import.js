function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => { resolve(reader.result); };
		reader.readAsText(file);
	});
}

export default async function importData(file, key) {
	if (key && key !== app('currentKey')) {
		await app('encoder').importKey(key);
		await app('encryptKey').store();
	}

	if (!app('encoder').hasKey())
		throw 'Encrypt key required';

	const encodedData = await readFile(file);
	if (!encodedData)
		throw 'File content empty';

	let data;
	try {
		const decrypted = await app('encoder').decrypt(encodedData);
		data = JSON.parse(decrypted);
	} catch (e) {
		throw e;
	}

	app('currentKey', key);

	app('data').setData(data);

	await app('data').store();

	reload();
}

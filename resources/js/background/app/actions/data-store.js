import CryptKeyUndefined from "../exceptions/crypt-key-undefined";
import ArgumentRequired from "../exceptions/argument-required";

export default async function (data) {
	if (!app('encoder').hasKey())
		throw new CryptKeyUndefined();

	if (!data)
		throw new ArgumentRequired('data');

	const encoder = app('encoder');
	const storage = app('storage');

	const encrypted = await encoder.encrypt(data);

	await storage.store('data', encrypted);

	console.log('Data stored to sync');

	return true;

}

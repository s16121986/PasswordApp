//import CryptKeyUndefined from "../exceptions/crypt-key-undefined";
import ArgumentRequired from "../exceptions/argument-required";

export default async function (data) {
	//const encoder = app('encoder');
	const storage = app('storage');

	if (!data)
		throw new ArgumentRequired('data');

	//else if (encoder.hasKey())
	//	throw new CryptKeyUndefined();

	//const encrypted = await encoder.encrypt(data);
	await storage.store('data', data);

	console.log('Data stored to sync');

	return true;

}

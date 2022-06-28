import CryptKeyUndefined from "../exceptions/crypt-key-undefined";

export default async function () {
	if (!app('encoder').hasKey())
		throw new CryptKeyUndefined();

	const storage = app('storage');

	const encrypted = await storage.read('data');
	if (!encrypted)
		return null;

	try {
		return await app('encoder').decrypt(encrypted);
	} catch (e) {
		console.error(e);
		return null;
	}
}

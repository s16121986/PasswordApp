//import CryptKeyUndefined from "../exceptions/crypt-key-undefined";

export default async function () {
	//const encoder = app('encoder');
	const storage = app('storage');

	//if (encoder.hasKey())
	//	throw new CryptKeyUndefined();

	const storeData = await storage.read('data');
	return storeData;
	if (!storeData)
		return;

	//return await encoder.decrypt(storeData);
}

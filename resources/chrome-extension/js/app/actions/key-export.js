import CryptKeyUndefined from "../exceptions/crypt-key-undefined";

export default async function keyExport() {
	const encoder = app('encoder');

	if (encoder.hasKey())
		throw new CryptKeyUndefined();

	return await encoder.exportKey();

}

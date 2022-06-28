import ArgumentRequired from "../exceptions/argument-required";

export default async function dataImport(encrypted) {
	if (!encrypted)
		throw new ArgumentRequired('data');

	return await app('storage').store('data', encrypted);
}

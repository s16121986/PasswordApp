import ArgumentRequired from "../exceptions/argument-required";

export default async function dataImport(data) {
	const storage = app('storage');

	if (!data)
		throw new ArgumentRequired('data');

	return await storage.store('data', data);
}

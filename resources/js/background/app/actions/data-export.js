export default async function dataExport() {
	const storage = app('storage');

	return await storage.read('data');
}

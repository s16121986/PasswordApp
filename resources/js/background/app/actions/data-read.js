export default async function () {
	const storage = app('storage');

	return await storage.read('data');
}

export default async function () {
	const storage = app('storage');

	await storage.clear('data');

	return true;
}

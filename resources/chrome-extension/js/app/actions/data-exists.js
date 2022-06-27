export default async function () {
	const storage = app('storage');
	const storeData = await storage.read('data');

	return !!storeData;
}

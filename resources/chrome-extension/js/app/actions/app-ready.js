

export default async function appReady() {
	if (app().isReady())
		return true;

	app().ready(() => {

	});
	const storage = app('storage');

	await storage.clear('data');

	return true;
}

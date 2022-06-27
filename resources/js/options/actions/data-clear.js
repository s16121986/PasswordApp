export default async function clearData() {
	setLoading(true);

	app('data').clear();

	await app('data').store();

	reload();
}

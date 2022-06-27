export default async function clearData() {
	app('data').clear();
	app('data').store();

	reload();
}

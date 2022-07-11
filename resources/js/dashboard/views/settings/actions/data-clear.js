export default async function clearData() {
	app('dashboard').setLoading(true);

	await app('broadcast').send('data-clear');

	await app('data').load();

	app('dashboard').update();

	//app('sidebar').update();

	app('dashboard').setLoading(false);
}

export default async function clearData() {
	setLoading(true);

	await app('broadcast').send('data-clear');

	reload();
}

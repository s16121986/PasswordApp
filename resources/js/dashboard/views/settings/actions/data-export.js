import download from "@support/export";

export default async function exportData() {
	app('dashboard').setLoading(true);

	const filename = 'password.txt';
	//const data = app('data').toString();
	//const encrypted = await app('encoder').encrypt(data);
	/*const syncStorage = app('data').sync.storage;
	const encrypted = await syncStorage.get();*/
	const encrypted = await app('dataSync').export();

	download(encrypted, filename, 'text/plain');

	app('dashboard').setLoading(false);
}

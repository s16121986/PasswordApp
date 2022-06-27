import download from "@support/export";

export default async function exportData() {
	const filename = 'password.txt';
	const data = app('data').toString();

	const encrypted = await app('encoder').encrypt(data);

	download(encrypted, filename, 'text/plain')
}

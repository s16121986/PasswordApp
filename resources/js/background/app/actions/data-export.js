export default async function dataExport() {
	return await app('storage').read('data');
}

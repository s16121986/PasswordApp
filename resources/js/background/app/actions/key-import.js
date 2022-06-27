export default async function keyImport(packed) {
	const encoder = app('encoder');

	await encoder.importKey(packed);

	localStorage.setItem('key', packed);

	return true;

}

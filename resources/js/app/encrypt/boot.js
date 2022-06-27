export default async function (encoder) {
	const packedKey = localStorage.getItem('key');
	if (!packedKey)
		return;

	await encoder.importKey(packedKey);

	if (!encoder.hasKey())
		localStorage.removeItem('key');

	return true;
}

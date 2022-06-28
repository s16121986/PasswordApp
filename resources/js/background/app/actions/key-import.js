function importKey(key) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({key: key}, () => { resolve(); });
	});
	/*

	localStorage.setItem('key', packed);

	return true;*/
}

export default async function keyImport(packed) {
	const encoder = app('encoder');

	await encoder.importKey(packed);

	if (!encoder.hasKey())
		return false;

	await importKey(packed);

	return true;
}

function loadKey() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get('key', (result) => {
			resolve(result.key);
		});
	});
}

export default async function bootStorage(encoder) {
	const keyHash = await loadKey();
	if (!keyHash)
		return;

	await app('encoder').importKey(keyHash);
}

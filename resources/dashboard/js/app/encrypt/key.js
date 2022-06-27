import utils from "./utils";

async function exportKey(key) {
	if (!key)
		return null;

	const buffer = await crypto.subtle.exportKey('raw', key);
	return utils.pack(buffer);
}

export default class Key {
	constructor(key) {
		this.key = key;
		this.algorithm = 'AES-GCM';
	}

	hasKey() { return !!this.key; }

	async generateKey() {
		const key = await crypto.subtle.generateKey({
			name: this.algorithm,
			length: 256,
		}, true, ['encrypt', 'decrypt']);

		return await exportKey(key);
	}

	async exportKey() { return await exportKey(this.key); }

	async importKey(packed) {
		this.key = null;

		const unpacked = utils.unpack(packed);
		if (!unpacked)
			return;

		try {
			this.key = await crypto.subtle.importKey('raw', unpacked, this.algorithm, true, ['encrypt', 'decrypt']);
		} catch (e) {

		}
	}

	async encrypt(data) {
		const encoded = utils.encode(data);
		const iv = utils.generateIv();

		const cipher = await crypto.subtle.encrypt({
			name: this.algorithm,
			iv: iv
		}, this.key, encoded);

		const json = JSON.stringify({
			cipher: utils.pack(cipher),
			iv: utils.pack(iv)
		});

		return btoa(json);
	}

	async decrypt(packed) {
		if (!packed)
			throw 'Pack format invalid (pack empty)';

		if (!this.key)
			throw 'Crypt key undefined';

		let json;
		try {
			json = JSON.parse(atob(packed));
		} catch (e) {
			//console.log(packed);
			throw 'Pack format invalid (json required)';
		}

		if (!json || !json.iv || !json.cipher)
			throw 'Pack format invalid (json broken)';

		const iv = utils.unpack(json.iv);
		const cipher = utils.unpack(json.cipher);

		if (!iv || !cipher)
			throw 'Pack format invalid (iv, cipher required)';

		let encoded;
		try {
			encoded = await crypto.subtle.decrypt({
				name: this.algorithm,
				iv: iv
			}, this.key, cipher);
		} catch (e) {
			throw 'Pack format invalid (decrypt failed)';
		}

		try {
			return utils.decode(encoded);
		} catch (e) {
			throw 'Decrypted data format invalid (decode failed)';
		}
	}
}

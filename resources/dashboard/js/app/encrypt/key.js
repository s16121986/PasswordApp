import utils from "./utils";

export default class Key {
	constructor(key) {
		this.key = key;
		this.algorithm = 'AES-GCM';
	}

	hasKey() { return !!this.key; }

	async generateKey() {
		this.key = await crypto.subtle.generateKey({
			name: this.algorithm,
			length: 256,
		}, true, ['encrypt', 'decrypt']);
	}

	async exportKey() {
		if (!this.key)
			return null;

		const buffer = await crypto.subtle.exportKey('raw', this.key);
		return utils.pack(buffer);
	}

	async importKey(packed) {
		this.key = await crypto.subtle.importKey('raw', packed, this.algorithm, true, ['encrypt', 'decrypt']);
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
		const json = JSON.parse(atob(packed));

		const iv = utils.unpack(json.iv);
		const cipher = utils.unpack(json.cipher)

		const encoded = await crypto.subtle.decrypt({
			name: this.algorithm,
			iv: iv
		}, this.key, cipher);

		return utils.decode(encoded);
	}
}

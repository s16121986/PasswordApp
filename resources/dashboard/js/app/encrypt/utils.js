function base64Decode(packed) {
	try {
		return atob(packed);
	} catch (e) {
		return null;
	}
}

export default {
	generateIv: () => crypto.getRandomValues(new Uint8Array(12)),

	pack: buffer => btoa(
		String.fromCharCode.apply(null, new Uint8Array(buffer))
	),

	unpack: packed => {
		const string = base64Decode(packed);
		if (!string)
			return;

		const buffer = new ArrayBuffer(string.length);
		const bufferView = new Uint8Array(buffer);

		for (let i = 0; i < string.length; i++) {
			bufferView[i] = string.charCodeAt(i);
		}

		return buffer
	},

//encode data to byte
	encode: data => (new TextEncoder()).encode(data),

//decode bytes to data
	decode: byteStream => (new TextDecoder()).decode(byteStream)
}

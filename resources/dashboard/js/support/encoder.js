export default {
	base64Encode: data => btoa(unescape(encodeURIComponent(data))),
	base64Decode: data => {
		try {
			return decodeURIComponent(escape(atob(data)));
		} catch (e) {
			return null;
		}
	}
}

import encoder from "../data/encoder"

function download(data, filename, type) {
	const file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		const a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

//'data:base64,' +
export default {
	base64: (data, filename) => download(encoder.base64Encode(data), filename, 'text/plain'),
	json: (data, filename) => download(data, filename, 'application/json')
}

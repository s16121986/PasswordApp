import "./popup"

$(document).ready(async function () {
	return;

	navigator.serviceWorker.register('/sw.js')
		.then(() => {
			console.log('SW registration successful 😍');
		}, err => {
			console.error('SW registration failed 😠', err)
		});

	navigator.serviceWorker.ready.then((registration) => {
		console.log(1)
	});
});

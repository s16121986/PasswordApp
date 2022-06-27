window.$ = window.jQuery = require('jquery');
//require("jquery-ui/ui/widgets/draggable");
//require("jquery-ui/ui/widgets/droppable");

import "../core/functions"
import "../app/functions"
import Application from "../app/app";

$(document).ready(async function () {
	new Application();

	app('data')
		.bind('load', () => { app('dashboard').update(); });

	const key = app('encryptKey');

	await key.load();

	if (key.exists())
		await app('data').load();
	else
		app('key-manager').show();

	$(document.body).removeClass('loading');
	/*navigator.serviceWorker.register('/sw.js')
		.then(() => {
			console.log('SW registration successful 😍');
		}, err => {
			console.error('SW registration failed 😠', err)
		});*/
});

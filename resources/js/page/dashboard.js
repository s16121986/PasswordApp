window.$ = window.jQuery = require('jquery');
//require("jquery-ui/ui/widgets/draggable");
//require("jquery-ui/ui/widgets/droppable");

import "../core/functions"
import "../app/functions"
import Application from "../app/app";

$(document).ready(async function () {
	new Application();

	await app('data').load();

	app('dashboard').update();

	$(document.body).removeClass('loading');
	/*navigator.serviceWorker.register('/sw.js')
		.then(() => {
			console.log('SW registration successful 😍');
		}, err => {
			console.error('SW registration failed 😠', err)
		});*/
});

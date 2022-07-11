import "../common"
import "../plugins/fixedHeader"
import Application from "../app/app";
import Dashboard from "../dashboard/dashboard";
import Progressbar from "../dashboard/ui/progressbar";
import Broadcast from "../app/broadcast/broadcast";
import Data from "../app/storage/data";
import Router from "../dashboard/router/router";

const extensionId = chrome.runtime.id;

$(document).ready(async function () {
	document.execCommand("defaultParagraphSeparator", false, "\n");

	new Application();

	app('broadcast', new Broadcast());

	const keyExists = await app('broadcast').send('key-exists');

	/*if (!keyExists) {
		if (extensionId)
			chrome.runtime.openOptionsPage();
		else
			window.open('options.html');
		return;
	}*/

	app('router', new Router());
	app('data', new Data());
	app('dashboard', new Dashboard());
	//app('password-generator', new PasswordGenerator());
	app('progressbar', new Progressbar());

	app('dashboard').setLoading(true);

	await app('data').retrieve();

	app('router')
		.addViewRoute('home')
		.addViewRoute('password-generator')
		.addViewRoute('notepad')
		.addViewRoute('settings')
		.boot(keyExists ? null : 'settings');

	app('dashboard').setLoading(false);
});

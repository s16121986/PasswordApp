import "../common"
import "../plugins/fixedHeader"
import Application from "../app/app";
import Dashboard from "../dashboard/dashboard";
import PasswordGenerator from "../dashboard/services/password-renerator/dialog";
import Progressbar from "../dashboard/ui/progressbar";
import Broadcast from "../app/broadcast/broadcast";
import Data from "../app/storage/data";

const extensionId = chrome.runtime.id;

$(document).ready(async function () {
	new Application();

	app('broadcast', new Broadcast());

	//const key = app('encryptKey');
	const keyExists = await app('broadcast').send('key-exists');

	if (!keyExists) {
		if (extensionId)
			chrome.runtime.openOptionsPage();
		else
			window.open('options.html');
		return;
	}

	app('data', new Data());
	app('dashboard', new Dashboard());
	app('password-generator', new PasswordGenerator());
	app('progressbar', new Progressbar());

	app('data')
		.bind('update', () => { app('dashboard').update(); });

	app('dashboard').setLoading(true);

	await app('data').load();

	app('dashboard').setLoading(false);

	app('dashboard').header.el.fixedHeader({});
});

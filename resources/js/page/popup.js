import "../common"
import "../plugins/fixedHeader"
import Application from "../app/app";
import Dashboard from "../dashboard/dashboard";
import PasswordGenerator from "../dashboard/services/password-renerator/dialog";
import Progressbar from "../dashboard/ui/progressbar";

const extensionId = chrome.runtime.id;

$(document).ready(async function () {
	new Application();

	const key = app('encryptKey');

	await key.load();

	if (!key.exists()) {
		if (extensionId)
			chrome.runtime.openOptionsPage();
		else
			window.open('options.html');
		return;
	}

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

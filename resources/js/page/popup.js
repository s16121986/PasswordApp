import "../common"
import "../plugins/fixedHeader"
import CryptKeyDialog from "../dashboard/dialogs/crypt-key";
import Application from "../app/app";
import Dashboard from "../dashboard/dashboard";
import PasswordGenerator from "../dashboard/services/password-renerator/dialog";
import Progressbar from "../dashboard/ui/progressbar";

$(document).ready(async function () {
	new Application();

	app('dashboard', new Dashboard());
	app('password-generator', new PasswordGenerator());
	app('progressbar', new Progressbar());

	app('data')
		.bind('update', () => { app('dashboard').update(); });

	app('dashboard').setLoading(true);

	const key = app('encryptKey');

	await key.load();

	if (key.exists())
		await app('data').load();
	else {
		const dataExists = await app('data').sync.exists();
		if (dataExists)
			CryptKeyDialog();
	}

	app('dashboard').setLoading(false);

	app('dashboard').header.el.fixedHeader({});
});

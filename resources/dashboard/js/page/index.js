import "../common"
import "../plugins/fixedHeader"
import CryptKeyDialog from "../app/dashboard/dialogs/crypt-key";
import Application from "../app/app";

$(document).ready(async function () {
	new Application();

	app('data')
		.bind('update', () => { app('dashboard').update(); });

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

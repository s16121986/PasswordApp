import "../common"
import CryptKeyDialog from "../app/dashboard/dialogs/crypt-key";
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
		CryptKeyDialog();

	app('dashboard').setLoading(false);
});

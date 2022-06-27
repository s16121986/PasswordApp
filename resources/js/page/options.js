import "../common"
import "../options/functions";
import Application from "../app/app";
import KeyImport from "../options/fieldset/key-import";
import DataImport from "../options/fieldset/data-import";
import DataExport from "../options/fieldset/data-export";
import DataClear from "../options/fieldset/data-clear";

$(document).ready(async function () {
	new Application();

	const key = app('encryptKey');

	const currentKey = await key.load();
	if (currentKey) {
		app('currentKey', currentKey);

		await app('data').load();
	}

	const dataExists = await app('data').sync.exists();

	app('dataState', {
		loaded: !app('data').isEmpty(),
		exists: dataExists
	});
	app('keyImport', new KeyImport());
	app('dataImport', new DataImport());
	app('dataExport', new DataExport());
	app('dataClear', new DataClear());

	setLoading(false);
});

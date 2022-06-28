import "../common"
import "../options/functions";
import Application from "../app/app";
import KeyImport from "../options/fieldset/key-import";
import DataImport from "../options/fieldset/data-import";
import DataExport from "../options/fieldset/data-export";
import DataClear from "../options/fieldset/data-clear";
import Broadcast from "../app/broadcast/broadcast";
import Data from "../app/storage/data";

$(document).ready(async function () {
	new Application();

	app('broadcast', new Broadcast());
	app('data', new Data());

	const currentKey = await app('broadcast').send('key-export');
	console.log(currentKey);
	if (currentKey) {
		app('currentKey', currentKey);

		await app('data').load();
	}

	const dataExists = await app('broadcast').send('data-exists');

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

import dataRead from "../actions/data-read"
import dataExists from "../actions/data-exists"
import dataStore from "../actions/data-store"
import dataClear from "../actions/data-clear"
/*import dataImport from "../actions/data-import";
import dataExport from "../actions/data-export";
import keyImport from "../actions/key-import";
import keyExport from "../actions/key-export";
import appReady from "../actions/app-ready";*/

export default function (router) {
	router
		//.addRoute('app-ready', appReady())
		.addRoute('data-read', dataRead)
		.addRoute('data-store', dataStore)
		.addRoute('data-exists', dataExists)
		//.addRoute('data-import', dataImport)
		//.addRoute('data-export', dataExport)
		.addRoute('data-clear', dataClear)
	//.addRoute('key-import', keyImport)
	//.addRoute('key-export', keyExport)
	;
}

import dataRead from "../actions/data-read"
import dataExists from "../actions/data-exists"
import dataStore from "../actions/data-store"
import dataClear from "../actions/data-clear"
import keyExists from "../actions/key-exists";
import keyExport from "../actions/key-export";
import keyImport from "../actions/key-import";
import dataImport from "../actions/data-import";
import dataExport from "../actions/data-export";
/*
import appReady from "../actions/app-ready";*/

export default function (router) {
	router
		//.addRoute('app-ready', appReady())
		.addRoute('data-read', dataRead)
		.addRoute('data-store', dataStore)
		.addRoute('data-exists', dataExists)
		.addRoute('data-clear', dataClear)
		.addRoute('data-export', dataExport)
		.addRoute('data-import', dataImport)
		.addRoute('key-exists', keyExists)
		.addRoute('key-export', keyExport)
		.addRoute('key-import', keyImport);
}

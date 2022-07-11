import Base from "../view"
import KeyImport from "./fieldset/key-import";
import DataImport from "./fieldset/data-import";
import DataExport from "./fieldset/data-export";
import DataClear from "./fieldset/data-clear";

let fieldSets = {};

export default class View extends Base {
	constructor() {
		super('settings');
	}

	boot(el) {
		let html = '<h1>Настройки приложения</h1>';

		el.html(html);

		fieldSets = {
			keyImport: new KeyImport(),
			dataImport: new DataImport(),
			dataExport: new DataExport(),
			dataClear: new DataClear()
		};

		for (let i in fieldSets) {
			el.append(fieldSets[i].el);
		}

		this.update();
	}

	async update() {
		const dataExists = await app('broadcast').send('data-exists');
		const keyHash = await app('broadcast').send('key-export');
		const dataState = {
			loaded: !app('data').isEmpty(),
			exists: dataExists,
			keyHash: keyHash
		};

		for (let i in fieldSets) {
			fieldSets[i].update(dataState);
		}
	}

	show() {
		super.show();
		this.update();
	}

}

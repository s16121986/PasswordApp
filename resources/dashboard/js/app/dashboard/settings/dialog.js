import Group from "./group";
import keyDialog from "./actions/key-dialog";
import Popup from "@ui/popup";
import CryptKeyDialog from "../dialogs/crypt-key";
import DataImportDialog from "../dialogs/data-import";
import DataExport from "./actions/data-export"

export default class Dialog extends Popup {
	action(action) {

	}

	boot(el, body) {
		const addGroup = (title) => {
			const group = new Group({title: 'Данные'});
			body.append(group.el);
			return group;
		};

		const data = app('data');

		addGroup('Синхронизация')
			.action({
				text: 'Ключ шифрования',
				cls: 'key',
				handler: CryptKeyDialog
			});

		addGroup('Данные')
			.action({
				text: 'Экспортировать',
				cls: 'export',
				disabled: data.isEmpty(),
				handler: DataExport
			})
			.action({
				text: 'Импортировать',
				cls: 'import',
				handler: DataImportDialog
			});
	}

}

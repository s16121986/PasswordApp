import Group from "./group";
import keyDialog from "./actions/key-dialog";
import Popup from "@ui/popup";

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
				handler: keyDialog
			});

		addGroup('Данные')
			.action({
				text: 'Экспортировать',
				cls: 'export',
				disabled: data.isEmpty(),
				handler: () => {}
			})
			.action({
				text: 'Импортировать',
				cls: 'import',
				handler: () => {}
			});
	}

}

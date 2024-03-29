import BaseMenu from "@ui/menu/menu";
import Form from "@ui/form/form";
import Site from "@app/model/site";
import Note from "@app/model/note";
import Email from "@app/model/email";
import Ssh from "@app/model/ssh";
import formFactory from "../forms/factory";

function createSubmit(data, form) {
	const model = form.get('model');
	model.update(data);

	const collection = app('data').getModelCollection(model);
	collection.add(model);

	model.store();

	app('dashboard').update();

	form.hide();
}

function getDefaultData() {
	const filters = app('filters');
	return {
		tags: filters.tags,
		favorite: filters.favorite,
		archive: filters.archive
	};
}

function createForm(modelFactory, title) {
	const model = new modelFactory();
	const form = new Form({
		title: title,
		data: getDefaultData(),
		submit: createSubmit
	});
	formFactory[model.model](form);
	form.show();
}

export default class Menu extends BaseMenu {
	constructor() {
		super({cls: 'mainmenu'});

		this
			.defaultItem({
				text: 'Добавить сайт',
				cls: 'site',
				handler: () => { createForm(Site, 'Добавить сайт'); }
			})
			.defaultItem({
				text: 'Добавить ssh',
				cls: 'ssh',
				handler: () => { createForm(Ssh, 'Добавить ssh'); }
			})
			.defaultItem({
				text: 'Добавить email',
				cls: 'email',
				handler: () => { createForm(Email, 'Добавить email'); }
			})
			.defaultItem({
				text: 'Добавить заметку',
				cls: 'note',
				handler: () => { createForm(Note, 'Добавить заметку'); }
			})
		/*.hr()
		.defaultItem({
			text: 'Настройки',
			cls: 'settings',
			handler: () => { app('settings').show(); }
		})*/
		/*.addItem({
			text: 'Добавить документ',
			cls: 'document',
			handler: () => { DocumentController.callAction('create', menu.model); }
		})
	/*.adtem({
		text: 'Добавить базу данных',
		cls: 'database',
		handler: () => { DatabaseController.callAction('create', menu.model); }
	})*/;
	}
}

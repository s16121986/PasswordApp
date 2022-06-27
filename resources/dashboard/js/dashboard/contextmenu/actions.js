import Form from "@ui/form/form";
import Password from "@app/model/password";
import formFactory from "../forms/factory";

export default {
	favorite: item => {
		const model = item.model;
		model.setFavorite(!model.isFavorite);
		model.store();
		app('dashboard').filter();
	},

	archive: item => {
		const model = item.model;
		model.setArchive(!model.isArchive);
		model.store();
		app('dashboard').filter();
	},

	addPassword: menuItem => {
		const item = menuItem.item;
		const model = item.model;
		const form = new Form({
			title: 'Новый пароль',
			submit: (data, form) => {
				const password = new Password(model, data);

				model.passwords.add(password);
				model.store();

				item.passwords.update();

				form.hide();
			}
		});
		formFactory.password(form);
		form.show();
	},

	edit: item => {
		const model = item.model;
		const form = new Form({
			title: model.toString(),
			data: model.data,
			model: model,
			submit: (data, form) => {
				model.update(data);
				model.store();

				if (undefined !== data.tags) {
					app('dashboard').header.update();
					app('dashboard').filter();
				}

				form.hide();
			}
		});
		formFactory[model.model](form);
		form.show();
	},

	tag: item => {
		if (item.model.hasTag(item.id))
			item.model.removeTag(item.id);
		else
			item.model.addTag(item.id);

		item.model.store();

		app('dashboard').header.update();
	},

	delete: menuItem => {
		const item = menuItem.item;
		const model = item.model;
		if (!confirm('Удалить запись "' + model.toString() + '"?'))
			return;

		if (model instanceof Password) {
			const parent = model.parent;
			parent.passwords.remove(model);
			parent.store();
			item.parent.passwords.update();
		} else {
			app('data').remove(model);
			app('data').store();
		}
	}
};

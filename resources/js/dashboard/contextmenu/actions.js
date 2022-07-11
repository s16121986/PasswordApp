import Form from "@ui/form/form";
import Password from "@app/model/password";
import formFactory from "../forms/factory";
import Confirm from "../ui/confirm";

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
					app('sidebar').update();
					app('dashboard').filter();
				}

				form.hide();
			}
		});
		formFactory[model.model](form);
		form.show();
	},

	tags: item => {
		let html = '';
		app('dashboard').availableTags
			.sort((a, b) => a > b ? 1 : (a === b ? 0 : -1))
			.forEach(t => {
				const flag = item.model.hasTag(t);
				html += '<div' + (flag ? ' class="selected"' : '') + ' data-tag="' + t + '">' + t + '</div>';
			});
		const popup = new Form({
			title: 'Выбор тегов',
			cls: 'tags-popup',
			html: html,
			submit: (data, form) => {
				let tags = [];
				form.el.find('div.window-body>div.selected').each(function () {
					tags[tags.length] = $(this).data('tag');
				});
				item.model.set('tags', tags);
				item.model.store();
				app('sidebar').update();
				app('dashboard').filter();
				form.hide();
			}
		});
		popup.el.find('div.window-body>div').click(function () { $(this).toggleClass('selected'); });
		popup.show();
	},

	/*tag: item => {
		if (item.model.hasTag(item.id))
			item.model.removeTag(item.id);
		else
			item.model.addTag(item.id);

		item.model.store();

		app('dashboard').header.update();
	},*/

	delete: menuItem => {
		const item = menuItem.item;
		const model = item.model;
		Confirm('Удалить запись "' + model.toString() + '"?', () => {
			if (model instanceof Password) {
				const parent = model.parent;
				parent.passwords.remove(model);
				parent.store();
				item.parent.passwords.update();
			} else {
				app('data').remove(model);
				app('data').store();
			}
		});
	}
};

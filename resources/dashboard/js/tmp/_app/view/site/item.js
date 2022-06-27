import BaseItem from "../default/item"
import PasswordController from "../../controller/password";
import SiteController from "../../controller/site";
import Password from "../password/item";

export default class Item extends BaseItem {
	#items = null;

	constructor(model) {
		super(model, {
			cls: 'site'
		});
	}

	boot(el) {
		this.row
			.append('<a href="' + this.get('url') + '" class="btn btn-link" target="_blank"></a>')
			.find('a').click((e) => { e.stopPropagation(); });


	}

	bootMenu(menu) {
		menu
			.favorite(() => { SiteController.callAction('favorite', this.model); })
			.addItem({
				text: 'Добавить пароль',
				cls: 'password',
				handler: () => { PasswordController.callAction('create', this.model); }
			})
			.edit(() => { SiteController.callAction('edit', this.model); })
			//.colors()
			.hr()
			.delete(() => { SiteController.callAction('delete', this.model); });
	}

	click() {
		if (null === this.#items) {
			this.#items = [];
			const el = $('<div class="items"></div>').appendTo(this.el);
			this.model.passwords.forEach((f) => {
				const item = new Password(f);
				this.#items.push(item);
				el.append(item.el);
			});
		} else
			this.el.find('>div.items').toggle();
	}

	destroy() {
		if (this.#items) {
			this.#items.forEach(item => item.destroy());
			this.#items = null;
		}

		super.destroy();
	}
}

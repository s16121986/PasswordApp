import BaseItem from "../default/item"
import Password from "../password/item";
import PasswordController from "../../controller/password";
import SshController from "../../controller/ssh";

export default class Item extends BaseItem {
	#items = null;

	constructor(model) {
		super(model, {
			cls: 'ssh'
		});
	}

	boot(el) {
		this.row.append('<div class="ip">' + this.get('ip') + '</div>');
	}

	bootMenu(menu) {
		menu
			.addItem({
				text: 'Добавить пароль',
				cls: 'password',
				handler: () => { PasswordController.callAction('create', this.model); }
			})
			.edit(() => { SshController.callAction('edit', this.model); })
			//.colors()
			.hr()
			.delete(() => { SshController.callAction('delete', this.model); });
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

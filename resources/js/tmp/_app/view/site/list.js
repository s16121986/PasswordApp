import BaseList from "../default/list";
import Password from "../password/item";
import SiteController from "../../controller/site";
import PasswordController from "../../controller/password";

export default class List extends BaseList {
	constructor(site) {
		super(site, {
			title: site.name
		});
	}

	bootMenu(menu) {
		menu
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

	render() {
		super.render();

		this.model.passwords.forEach((f) => {
			this.addItem(new Password(f));
		});
	}
}

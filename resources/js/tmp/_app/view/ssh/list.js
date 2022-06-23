import BaseList from "../default/list";
import Password from "../password/item";
import SshController from "../../controller/ssh";
import PasswordController from "../../controller/password";

export default class List extends BaseList {
	constructor(ssh) {
		super(ssh, {
			title: ssh.name
		});
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

	render() {
		super.render();

		this.model.passwords.forEach((f) => {
			this.addItem(new Password(f));
		});
	}
}

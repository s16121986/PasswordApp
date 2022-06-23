import BaseList from "../default/list";

export default class List extends BaseList {
	constructor(email) {
		super(email, {
			title: email.name
		});
	}

	bootMenu(menu) {
		menu
			.edit()
			.colors()
			.hr()
			.delete();
	}

	update() {

	}
}

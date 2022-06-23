import Item from "./item"

export default class Email extends Item {
	constructor(el) {
		super(el);
	}

	bootMenu(menu) {
		menu
			.edit('/email/' + this.id + '/edit')
			.hr()
			.colors('/email/' + this.id + '/color/')
			.hr()
			.delete('/email/' + this.id + '/delete');
	}
}

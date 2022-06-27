import Item from "./item"

export default class Note extends Item {
	constructor(el) {
		super(el);
	}

	bootMenu(menu) {
		menu
			.edit('/note/' + this.id + '/edit')
			.hr()
			.colors('/note/' + this.id + '/color/')
			.hr()
			.delete('/note/' + this.id + '/delete');
	}
}

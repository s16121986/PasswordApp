import Item from "./item"

export default class Site extends Item {
	constructor(el) {
		super(el);
	}

	bootMenu(menu) {
		menu
			.addItem({url: '/password/create?p=site&pid=' + this.id, text: 'Добавить пароль', cls: 'password'})
			.edit('/site/' + this.id + '/edit')
			.hr()
			.colors('/site/' + this.id + '/color/')
			.hr()
			.delete('/site/' + this.id + '/delete');
	}
}

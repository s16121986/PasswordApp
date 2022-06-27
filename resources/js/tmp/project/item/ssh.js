import Item from "./item"

export default class Ssh extends Item {
	constructor(el) {
		super(el);
	}

	bootMenu(menu) {
		menu
			.addItem({url: '/password/create?p=ssh&pid=' + this.id, text: 'Добавить пароль', cls: 'password'})
			.edit('/ssh/' + this.id + '/edit')
			.hr()
			.colors('/ssh/' + this.id + '/color/')
			.hr()
			.delete('/ssh/' + this.id + '/delete');
	}
}

import BaseItem from "./item"
import selection from "../../support/selection"

export default class Email extends BaseItem {

	constructor(model) {
		super(model, {
			cls: 'email'
		});
	}

	boot() {
		const el = this.row;

		el.append('<div class="btn btn-eye" title="Показать пароль"></div>'
			+ '<div class="btn btn-password" title="Скопировать пароль"></div>');

		const password = this.model.get('password');

		el.find('div.name').click(function () {
			selection.element(this);
			copy(this.innerText, 'Логин скопирован');
		});

		el.find('div.btn-eye').one('click', function () {
			$(this).attr('class', 'password').html(password);
			selection.element(this);
		});

		el.find('div.btn-password').click(() => { copy(password, 'Пароль скопирован'); });
	}
}

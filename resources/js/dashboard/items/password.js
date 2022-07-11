import BaseItem from "./item"
import selection from "../../support/selection"

export default class Password extends BaseItem {

	constructor(parent, model) {
		super(model, {
			cls: 'password',
			name: model.name
		});

		this.parent = parent;
	}

	boot() {
		const el = this.row;
		const model = this.model;

		el.append('<div class="btn btn-eye" title="Показать пароль"></div>'
			+ '<div class="btn btn-password" title="Скопировать пароль"></div>');

		el.find('div.name').click(function () {
			selection.element(this);
			copy(this.innerText, 'Логин скопирован');
		});

		el.find('div.btn-eye').click('click', function () {
			if ($(this).hasClass('password')) {
				$(this).attr('class', 'btn btn-eye').html('');
			} else {
				const password = model.get('password');
				$(this).attr('class', 'password').html(password);
				//selection.element(this);
			}
		});

		el.find('div.btn-password').click(() => { copy(model.get('password'), 'Пароль скопирован'); });
	}

	update() {
		super.update();
		this.row.find('div.password').html(this.model.get('password'));
	}

	destroy() {
		super.destroy();
		this.parent = undefined;
	}
}

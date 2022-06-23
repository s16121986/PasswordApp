import BaseForm from "../default/form"

export default class Form extends BaseForm {
	constructor(params) {
		super(params);

		this
			.text('login', {label: 'Логин'})
			.text('password', {label: 'Пароль'});
	}
}

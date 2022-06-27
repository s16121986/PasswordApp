import BaseForm from "../default/form"

export default class Form extends BaseForm {
	constructor(params) {
		super(params);

		this
			//.text('name', {label: 'Название'})
			.email('email', {label: 'Email'})
			.password('password', {label: 'Пароль'});
	}
}

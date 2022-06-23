import BaseForm from "../default/form"

export default class Form extends BaseForm {
	constructor(params) {
		super(params);

		this
			.text('name', {label: 'Название'})
			//.text('url', {label: 'Ссылка'})
		;
	}
}

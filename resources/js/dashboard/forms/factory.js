function addMain(form) {
	form
		.tags()
		.checkbox('favorite', {label: 'Избранное'})
		.checkbox('archive', {label: 'Архив'});
}

export default {
	site: form => {
		form
			.text('name', {label: 'Название'})
			.text('url', {label: 'Ссылка'});
		addMain(form);
	},

	email: form => {
		form
			//.text('name', {label: 'Название'})
			.email('email', {label: 'Email'})
			.password('password', {label: 'Пароль'});
		addMain(form);
	},

	note: form => {
		form
			.text('name', {label: 'Название'})
			.textarea('text', {label: 'Текст'});
		addMain(form);
	},

	ssh: form => {
		form
			.text('name', {label: 'Название'})
			.text('ip', {label: 'IP'});
		addMain(form);
	},

	password: form => {
		form
			.text('login', {label: 'Логин'})
			.text('password', {label: 'Пароль'});
	}
};

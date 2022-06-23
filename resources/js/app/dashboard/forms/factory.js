export default {
	site: form => {
		form
			.text('name', {label: 'Название'})
			.text('url', {label: 'Ссылка'})
			.tags();
	},

	email: form => {
		form
			//.text('name', {label: 'Название'})
			.email('email', {label: 'Email'})
			.password('password', {label: 'Пароль'})
			.tags();
	},

	note: form => {
		form
			.text('name', {label: 'Название'})
			.textarea('text', {label: 'Текст'})
			.tags();
	},

	ssh: form => {
		form
			.text('name', {label: 'Название'})
			.text('ip', {label: 'IP'})
			.tags();
	},

	password: form => {
		form
			.text('login', {label: 'Логин'})
			.text('password', {label: 'Пароль'});
	}
};

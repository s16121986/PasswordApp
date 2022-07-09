export default class Menu{
	constructor() {
		let html = '<div class="sidebar-menu"></div>';
		const add = (action, text) => {
			html += '<div class="item ' + action+ '" data-action="' + action+ '">' + text + '</div>';
		};

		spacer();
		add('', 'Добавить');
		add('password-generator', 'Генератор паролей');
		add('settings', 'Настройки')

		this.el = $(html);
	}

}

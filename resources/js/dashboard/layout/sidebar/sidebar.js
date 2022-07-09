class Tabs{
	constructor() {
		this.el = $('<nav></nav>');
	}

	update() {

	}
}

export default class Sidebar {
	#el;

	constructor() {
		app('data')
			.bind('update', () => { this.update(); });

		const el = $('<sidebar></sidebar>');

		this.tabs = new Tabs();
		el.append(this.tabs.el);

		let html = '<div class="sidebar-menu">''</div>';
		const add = (action, text) => {
			html += '<div class="item ' + action+ '" data-action="' + action+ '">' + text + '</div>';
		};

		spacer();
		add('', 'Добавить');
		add('password-generator', 'Генератор паролей');
		add('settings', 'Настройки')

		el.append(html);

		this.#el = el;
	}

	update() {

	}
}

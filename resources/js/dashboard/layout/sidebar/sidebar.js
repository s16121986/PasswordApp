import Tags from "./tags";

const actions = {
	home: () => { route('home'); },
	notepad: () => { route('notepad'); },
	'password-generator': () => { route('password-generator'); },
	settings: () => { route('settings'); }
};

function onAction() {
	const action = $(this).data('action');
	//const sidebar = app('dashboard').sidebar;
	actions[action]();
}

export default class Sidebar {
	#el;

	constructor() {
		app('data')
			.bind('update', () => { this.update(); });

		const el = $('<sidebar></sidebar>');

		this.tags = new Tags();
		el.append(this.tags.el);

		//this.tabs = new Tabs();
		//el.append(this.tabs.el);
		let html = '';

		//html += '<div class="spacer"></div>';
		html += '<nav class="bottom">';
		const add = (action, text) => {
			html += '<div class="item ' + action + '" data-action="' + action + '">' + text + '</div>';
		};

		add('notepad', 'Блокнот');
		add('password-generator', 'Генератор паролей');
		add('settings', 'Настройки');

		html += '</nav>';

		el.append(html);

		el.find('div.item').click(onAction);

		this.#el = el;

		app('sidebar', this);

		app('data').bind('update', () => { this.update(); });
	}

	get el() { return this.#el; }

	update() {
		this.tags.update();
	}
}

import Menu from "../mainmenu/menu";

let inputTimeout;


export default class Header {
	#el;
	#menu;

	constructor() {
		this.#menu = new Menu();

		const el = $('<header>'
			+ '<div class="wrap">'
			+ '<div class="logo"></div>'
			+ '<div class="search">'
			+ '<input type="text" autocomplete="off" placeholder="Быстрый поиск" value="' + (app('filters').term || '') + '" />'
			+ '<div class="btn btn-clear"></div>'
			+ '</div>'
			+ '<div class="btn btn-menu" title="Главное меню"></div>'
			+ '</div>'
			+ '</header>');
		const btnClear = el.find('div.btn-clear');
		const input = el.find('input');

		this.#el = el;

		el.find('div.wrap').append(this.#menu.el);

		el.find('input').bind('input', e => {
			if (inputTimeout)
				clearTimeout(inputTimeout);
			inputTimeout = window.setTimeout(() => {
				inputTimeout = undefined;
				app('filters').term = input.val();
				app('filters').store();
				route('home');
				app('dashboard').update();
			}, 300);

			btnClear[input.val() === '' ? 'hide' : 'show']();
		});

		el.find('div.btn-menu').click(e => {
			e.stopPropagation();
			this.#menu.toggle();
		});

		el.find('div.logo').click(e => { route('home'); });

		btnClear[input.val() === '' ? 'hide' : 'show']()
			.click(e => { input.val('').trigger('input'); });
	}

	get el() { return this.#el; }
}

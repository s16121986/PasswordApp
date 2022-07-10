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
			+ '</div>'
			+ '<div class="btn btn-menu" title="Главное меню"></div>'
			+ '</div>'
			+ '</header>');

		this.#el = el;

		el.find('div.wrap').append(this.#menu.el);

		el.find('input').bind('input', e => {
			if (inputTimeout)
				clearTimeout(inputTimeout);

			inputTimeout = window.setTimeout(() => {
				inputTimeout = undefined;
				app('filters').term = el.find('input').val();
				app('filters').store();
				app('dashboard').view('home');
				app('dashboard').update();
			}, 300);
		});

		el.find('div.btn-menu').click(e => {
			e.stopPropagation();
			this.#menu.toggle();
		});

		el.find('div.logo').click(e => { app('dashboard').view('home'); });
	}

	get el() { return this.#el; }
}

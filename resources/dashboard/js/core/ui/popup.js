let _shadow;
let current;

function shadow() {
	return _shadow || (_shadow = $('<div class="shadow"></div>').appendTo(document.body));
}

export default class Popup {
	#el;
	#params;

	constructor(params) {
		params = Object.assign({}, params);

		this.#params = params;

		if (params.visible)
			this.show();
	}

	boot() {}

	get el() {
		if (this.#el)
			return this.#el;

		const params = this.#params;
		const wrap = shadow();
		const win = $('<div class="window window-form ' + (params.cls || '') + '">'
			+ '<div class="btn-close"></div>'
			+ '<div class="window-title">' + params.title + '</div>'
			+ '<div class="window-body"></div>'
			+ '</div>').appendTo(wrap);

		win.find('div.btn-close').click(e => { this.hide(); });

		this.#el = win;

		this.boot(win, win.find('div.window-body'));

		return win;
	}

	set(name, value) {
		this.#params[name] = value;
		return this;
	}

	get(name) { return this.#params[name]; }

	title(title) { return this.set('title', title); }

	show() {
		if (current)
			current.hide();

		current = this;
		shadow().show();
		this.el.show();
	}

	hide() {
		if (this.get('hideAction') === 'destroy')
			return this.destroy();

		if (current === this) current = undefined;
		shadow().hide();
		this.#el.hide();
	}

	destroy() {
		if (current === this) current = undefined;
		shadow().hide();
		this.#el.remove();
		this.#el = undefined;
		this.#params = undefined;
	}

	setLoading(flag) { this.#el[flag ? 'addClass' : 'removeClass']('loading'); }

}

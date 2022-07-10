export default class View {
	#el;

	constructor(name, params) {
		this.name = name;
	}

	boot() { }

	update() {}

	get el() {
		if (this.#el)
			return this.#el;

		const el = $('<div class="view view-' + this.name + '"></div>');

		this.#el = el;

		this.boot(el);

		return this.#el;
	}

	show() { this.#el.show(); }

	hide() { this.#el.hide(); }

	get isRendered() { return !!this.#el; }
}

let I = 0;

export default class Element {
	#el;
	#name;

	constructor(name, params) {
		params = Object.assign({}, params);
		this.#el = $('<div class="form-field ' + (params.cls || '') + '"></div>')
		this.#name = name;
		this.id = 'elm-' + I++;

		this.boot(this.#el, params);
	}

	get name() { return this.#name; }

	get el() { return this.#el; }

	boot(el, params) {
		el.append('<label class="form-element-label" for="' + this.id + '">' + params.label + '</label>');
	}
}

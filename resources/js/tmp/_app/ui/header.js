export default class Header {
	#el;
	#current;

	constructor() {
		this.#el = $('<header>'
			+ '<div class="btn-back"></div>'
			+ '<input type="text" />'
			+ '</header>');
	}

	get el() { return this.#el; }
}

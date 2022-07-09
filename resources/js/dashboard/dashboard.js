import Header from "./layout/header"

export default class Dashboard {
	#el;
	#header;

	constructor() {
		this.#el = $('<div class="dashboard"></div>').appendTo(document.body);
	}

	get el() { return this.#el; }

	get header() { return this.#header; }

	setLoading(flag) { $(document.body)[flag ? 'addClass' : 'removeClass']('loading'); }
}

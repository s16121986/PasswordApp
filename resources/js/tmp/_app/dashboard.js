import Header from "./ui/header"

export default class Dashboard {
	static #instance;

	static getInstance() { return this.#instance || (this.#instance = new Dashboard()); }

	#el;
	#header;
	#content;
	#page;

	constructor() {
		this.#el = $(document.body);
		this.#header = new Header();

		this.#el.append(this.#header.el);
		this.#content = $('<section></section>').appendTo(this.#el);
	}

	get content() { return this.#content; }

	update() {
		this.#page.update();
	}

	home() { this.page(); }

	page(page) {
		if (this.#page)
			this.#page.destroy();

		this.#page = page;

		this.#page.render();
	}

	list(model) {

	}

	route() {

	}

}

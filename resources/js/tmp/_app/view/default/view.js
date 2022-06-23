import ActionsMenu from "../../ui/actions-menu";

export default class View {
	#el;
	#model;
	#menu;

	constructor(model) {
		this.#model = model;
		this.#el = dashboard().content;

		model.bind('change', () => { this.update(); });
	}

	get el() { return this.#el; }

	get content() { return this.#el.find('div.page-content'); }

	get model() { return this.#model; }

	render() {
		let html = '<div class="page">';
		html += '<div class="page-head">'
			+ (this.#model === app() ? '<div class="btn btn-empty"></div>' : '<div class="btn btn-back"></div>')
			+ '<div class="title">' + this.#model.toString() + '</div>'
			+ '<div class="btn btn-menu"></div>'
			+ '</div>';
		html += '<div class="page-content"></div>';
		html += '</div>';

		this.#el.html(html);

		this.#el.find('div.btn-back').click(() => { back(); });
		this.#el.find('div.btn-menu').click((e) => {
			e.stopPropagation();
			this.menu();
		});/**/
	}

	update() {
		if (this.#menu) {
			this.#menu.destroy();
			this.#menu = null;
		}

		this.#el.html('');

		this.render();
	}

	destroy() {
		if (this.#menu) {
			this.#menu.destroy();
			this.#menu = null;
		}

		this.#el.html('');
	}

	bootMenu() {}

	menu() {
		if (!this.#menu) {
			this.#menu = new ActionsMenu(this.#model);
			this.bootMenu(this.#menu);
			this.#el.find('div.page-head').append(this.#menu.el);
			this.#menu.show();
		} else if (this.#menu.isHidden())
			this.#menu.show();
		else
			this.#menu.hide();
	}
}

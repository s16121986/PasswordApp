import ActionsMenu from "../../ui/actions-menu";
import PasswordController from "../../controller/password";

function copy(el, text) {
	if (navigator.clipboard) {
		const stateEl = $('<div class="app-state copied loading">Копирование</div>').appendTo(document.body);

		navigator.clipboard.writeText(text)
			.then(() => {
				stateEl
					.removeClass('loading')
					.addClass('success')
					.html('Скопировано');
				window.setTimeout(function () { stateEl.fadeOut(); }, 1000);
			})
			.catch(err => {
				stateEl
					.removeClass('loading')
					.addClass('error');
				window.setTimeout(function () { stateEl.fadeOut(); }, 1000);
				console.log(err);
			});
	} else {
		//el.html(text);
	}
}

export default class Item {
	#el;
	#model;
	#menu;

	constructor(model, params) {
		this.#model = model;
		this.#el = $('<div class="item item-' + params.cls + '" data-id="' + model.id + '">'
			+ '<div class="row">'
			//+ '<div class="icon"></div>'
			+ '<div class="name">' + (params.name || this.name) + '</div>'
			+ '<div class="btn btn-menu"></div>'
			+ '</div>'
			+ '</div>');

		this.#el.find('>div.row').click((e) => {
			//console.log(this.#el.attr('class'), e)
			//if (this.#el.hasClass('disabled'))
			//	return;
			this.click();
		});

		this.#el.find('div.btn-menu').click((e) => {
			e.stopPropagation();
			$(document).click();
			this.menu();
		});

		this.boot(this.#el);
	}

	get el() { return this.#el; }

	get row() { return this.#el.find('>div.row'); }

	get model() { return this.#model; }

	get name() { return this.#model.name; }

	get(name) { return this.#model.get(name); }

	boot(el) {}

	bootMenu() { }

	menu() {
		if (!this.#menu) {
			this.#menu = new ActionsMenu(this.model);
			this.bootMenu(this.#menu);
			this.el.append(this.#menu.el);
			this.#menu.show();
		} else if (this.#menu.isHidden())
			this.#menu.show();
		else
			this.#menu.hide();
	}

	click() {
		//dashboard().list(this.#model);
	}

	destroy() {
		if (this.#menu) {
			this.#menu.destroy();
			this.#menu = null;
		}

		this.#el.html('');
		this.#el = null;
	}
}

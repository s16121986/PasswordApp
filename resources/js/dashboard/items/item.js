import ActionsMenu from "../contextmenu/menu";
import menuFactory from "../contextmenu/factory";

function onChange() {
	this.update();
}

function onFavoriteChange(flag) {
	this.el[flag ? 'addClass' : 'removeClass']('favorite');
}

function onArchiveChange(flag) {
	this.el[flag ? 'addClass' : 'removeClass']('archive');
}

export default class Item {
	#el;
	#model;

	constructor(model, params) {
		this.#model = model;
		const el = $('<div class="item item-' + params.cls + '">'
			+ '<div class="row">'
			+ '<div class="icon"></div>'
			+ '<div class="name">' + (params.name || this.name) + '</div>'
			+ '<div class="flag favorite"></div>'
			+ '<div class="flag archive"></div>'
			+ '<div class="spacer"></div>'
			+ '</div>'
			+ '</div>');

		this.#el = el;

		if (model.isFavorite)
			el.addClass('favorite');

		if (model.isArchive)
			el.addClass('archive');

		model
			.bind('change', onChange, this)
			.bind('favorite-change', onFavoriteChange, this)
			.bind('archive-change', onArchiveChange, this);

		el.find('>div.row')
			.click(e => { this.click(); })
			.bind('contextmenu', e => {
				e.preventDefault();
				const menu = new ActionsMenu(this);
				menuFactory[model.model](menu);
				menu.show({x: e.pageX, y: e.pageY});
			});

		this.boot(el);
	}

	get el() { return this.#el; }

	get row() { return this.#el.find('>div.row'); }

	get model() { return this.#model; }

	get name() { return this.#model.name; }

	get(name) { return this.#model.get(name); }

	boot(el) {}

	bootMenu() { }

	bootForm() { }

	update() {
		this.row.find('div.name').html(this.model.name);
	}

	click() { }

	show() { this.#el.show(); }

	hide() { this.#el.hide(); }

	destroy() {
		this.#model
			.unbind('change', onChange)
			.unbind('favorite-change', onFavoriteChange);

		this.#el.remove();
		this.#el = undefined;
		this.#model = undefined;
	}
}

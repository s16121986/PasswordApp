import itemFactory from "./items/factory";

let activeMenu;

function ondocumentclick(e) { activeMenu.hide(); }

export default class Menu {
	#el;
	#items = [];
	#options;

	constructor(options) {
		options = Object.assign({
			cls: ''
		}, options);
		this.#el = $('<div class="list-menu ' + options.cls + '"></div>')
			.click(e => { e.stopPropagation(); });
		this.id = options.id;
		this.#options = options;

		if (options.items)
			this.setItems(options.items);
	}

	get el() { return this.#el; }

	get items() { return this.#items; }

	getOption(name, def) { return this.#options[name] || def; }

	itemFactory(params) { return itemFactory.factory(params); }

	isEmpty() { return this.#items.length === 0; }

	getItem(id) {
		const item = this.#items.find(i => i.id === id);
		if (item)
			return item;

		const items = this.#items.filter(i => !!i.menu);
		const l = items.length;
		for (let i = 0; i < l; i++) {
			const item = items[i].menu.getItem(id);
			if (item)
				return item;
		}
	}

	setItems(items) {
		this.#items.forEach(item => item.destroy());
		this.#items = [];

		items.forEach(r => {
			if (r === '-')
				return this.hr();
			else
				this.addItem(this.itemFactory(r));
		});
	}

	addItem(item) {
		this.#items.push(item);
		this.#el.append(item.el);
		return this;
	}

	defaultItem(params) { return this.addItem(itemFactory.item(params)); }

	toggleItem(params) { return this.addItem(itemFactory.toggle(params)); }

	menuItem(params) { return this.addItem(itemFactory.menu(params)); }

	hr() {
		this.#el.append('<hr />');
		return this;
	}

	isHidden() { return this.#el.is(':hidden'); }

	show(pos) {
		if (activeMenu)
			activeMenu.hide();
		activeMenu = this;
		this.#el.show();
		$(document).click(ondocumentclick);

		if (pos)
			this.position(pos);
	}

	position(pos) {
		const wH = $(window).height();
		const wS = $(window).scrollTop();
		let y = pos.y;
		if (pos.y + this.el.outerHeight() > wH + wS)
			y -= this.el.outerHeight();

		this.#el.css({
			left: pos.x,
			top: y
		});
	}

	hide() {
		this.#el.hide();
		$(document).unbind('click', ondocumentclick);
	}

	toggle() {
		if (this.isHidden())
			this.show();
		else
			this.hide();
	}

	reset() {
		this.#el.html('');
		this.#items = [];
	}

	destroy() {
		if (activeMenu === this)
			activeMenu = undefined;

		$(document).unbind('click', ondocumentclick);

		this.#el.remove();
		this.#el = undefined;
		this.#items.forEach(item => item.destroy());
		this.#items = undefined;
	}
}

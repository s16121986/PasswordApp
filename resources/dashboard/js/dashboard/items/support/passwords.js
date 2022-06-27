import Password from "../password";

function getPasswordsItems(item) {
	return item.model.passwords.map(f => new Password(item, f));
}

export default class Passwords {
	#items;

	constructor(item) {
		this.item = item;
	}

	toggle() {
		if (undefined === this.#items) {
			this.el = $('<div class="child"></div>').appendTo(this.item.el);
			this.#items = getPasswordsItems(this.item);
			this.#items.forEach(item => { this.el.append(item.el); });
		} else
			this.el.toggle();
	}

	update() {
		if (undefined === this.#items)
			return;

		this.#items.forEach(item => item.destroy());
		this.#items = getPasswordsItems(this.item);
		this.#items.forEach(item => { this.el.append(item.el); });
	}

	remove(item) {
		const i = this.#items.findIndex(it => it === item);
		this.#items[i].destroy();
		this.#items.splice(i, 1);
	}

	destroy() {
		if (this.#items) {
			this.#items.forEach(item => item.destroy());
			this.#items = undefined;
		}
	}
}

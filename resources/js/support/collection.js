export default class Collection {
	#items = [];

	constructor() {}

	isEmpty() { return this.#items.length === 0; }

	eq(i) { return this.#items[i]; }

	getAll() { return this.#items; }

	get(id) { return this.#items.find(item => item.id === id); }

	find(fn) { return this.#items.find(fn); }

	add(item) { this.#items.push(item); }

	remove(item) {
		const items = this.#items;
		const i = items.findIndex(it => it === item);
		if (i === -1)
			return;

		items[i].destroy();
		items.splice(i, 1);
	}

	count() { return this.#items.length; }

	forEach(fn) { return this.#items.forEach(fn); }

	filter(fn) { return this.#items.filter(fn); }

	map(fn) { return this.#items.map(fn); }

	sort(fn) { return this.#items.sort(fn); }

	clear() {
		this.#items.forEach(item => item.destroy());
		this.#items = [];
	}

	destroy() { this.clear(); }

	serialize() { return this.#items.map(item => item.serialize()); }

}

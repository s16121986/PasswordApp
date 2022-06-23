export default class Items {
	#items = [];

	constructor(el, itemFactory) {
		let items = [];
		el.find('div.item').each(function () {
			items[items.length] = new itemFactory($(this));
		});

		this.#items = items;
	}
}

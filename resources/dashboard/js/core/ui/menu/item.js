export default class Item {
	#el;

	constructor(options) {
		this.handler = options.handler;

		this.id = options.id;

		Object.assign(this, options.data);

		const el = $('<div class="item ' + (options.cls || '') + '">'
			+ '<div class="item-wrap">'
			+ '<div class="icon"></div>'
			+ '<div class="text">' + options.text + '</div>'
			+ (options.shortcut ? '<div class="shortcut">' + options.shortcut + '</div>' : '')
			+ (options.menu || options.items ? '<i></i>' : '')
			+ '</div>'
			+ '</div>');

		this.#el = el;

		if (this.handler)
			el.click(e => {
				if (!this.isDisabled())
					this.handler(this);
			});
	}

	get el() { return this.#el; }

	isDisabled() { return this.#el.hasClass('disabled'); }

	disable() { this.#el.addClass('disabled'); }

	enable() { this.#el.removeClass('disabled'); }

	destroy() {
		this.#el.remove();
		this.#el = undefined;
	}
}

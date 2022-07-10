import selection from "../../../support/selection";


export default class View {
	#changed = false;
	#timeout;

	constructor(item) {
		this.item = item;
	}

	toggle() {
		if (undefined === this.el) {
			this.el = $('<div class="child note-content"></div>').appendTo(this.item.el);

			const text = this.item.model.get('text');
			this.el
				.html(text)
				.prop('spellcheck', false)
				.prop('contenteditable', true)
				.click((e) => {
					if (e.ctrlKey)
						selection.expand('word');
				})
				.bind('input', (e) => {
					if (this.#timeout)
						clearTimeout(this.#timeout);

					this.#changed = true;

					this.#timeout = setTimeout(() => {
						this.store();
						this.#timeout = undefined;
					}, 400);
					//this.#timeout.start(true);
				});
		} else
			this.el.toggle();

		this.el.parent().toggleClass('expanded');
	}

	update() {
		this.el.html(this.item.model.get('text'));
		this.#changed = false;
		//el.html(text.replace(/http(|s):\/\/.*/g, '<a href="$&" target="_blank">$&</a>'));
	}

	store() {
		const text = this.el[0].innerHTML;
		const model = this.item.model;
		model.set('text', text);
		model.store();
		this.#changed = false;
	}

	destroy() {
		if (undefined === this.el)
			return;

		this.el.remove();
		this.el = undefined;
		this.item = undefined;
		this.#changed = undefined;
	}
}



import Element from "./element";

class Tag {
	constructor(field, tag) {
		this.value = tag.toLowerCase();
		this.el = $('<div class="tag">'
			+ this.value
			+ '<div class="btn-remove"></div>'
			+ '</div>');

		this.el.find('div.btn-remove').click(e => { field.remove(this); });
	}

	remove() {
		this.el.remove();
		this.el = undefined;
		this.value = undefined;
	}
}

export default class Tags extends Element {
	#tags = [];

	constructor() { super('tags'); }

	boot(el) {
		super.boot(el, {label: 'Теги'});

		el.addClass('field-tags');

		const wrap = $('<div class="wrap">'
			+ '<input type="text" id="' + this.id + '" autocomplete="off" />'
			+ '<nav></nav>'
			+ '</div>')
			.appendTo(el);

		wrap.find('input')
			.bind('keydown', e => {
				switch (e.key) {
					case 'Enter':
						e.preventDefault();
						this.input.blur().focus();
						break;
					case 'Escape':
						this.input.val('').focus();
						break;
				}
			})
			.bind('blur', e => {
				const val = this.input.val().toLowerCase();
				if (val === '')
					return;

				const exists = this.#tags.find(t => t.value === val);
				if (!exists) {
					const tag = new Tag(this, val);
					this.#tags.push(tag);
					this.el.find('nav').append(tag.el);
				}

				this.input.val('');
			});
	}

	remove(tag) {
		const i = this.#tags.findIndex(t => t === tag);
		this.#tags.splice(i, 1);
		tag.remove();
	}

	get input() { return this.el.find('input'); }

	get value() { return this.#tags.map(tag => tag.value); }

	set value(v) {
		const nav = this.el.find('nav');
		this.#tags.forEach(tag => tag.remove());
		this.#tags = (v || []).map(t => {
			const tag = new Tag(this, t);
			nav.append(tag.el);
			return tag;
		});
	}
}

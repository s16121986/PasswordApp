let I = 0;

class Element {
	#el;
	#name;

	constructor(name, params) {
		this.#el = $('<div class="form-field"></div>')
		this.#name = name;
		this.id = 'elm-' + I++;

		this.boot(this.#el, params);
	}

	get name() { return this.#name; }

	get el() { return this.#el; }

	boot(el, params) {
		el.append('<label class="form-element-label" for="' + this.id + '">' + params.label + '</label>');
	}
}

class Text extends Element {
	boot(el, params) {
		super.boot(el, params);

		el.append('<input type="' + (params.inputType || 'text') + '" autocomplete="off" id="' + this.id + '"'
			+ ' value="' + (params.value || params.default || '') + '" />');
	}

	get value() { return this.el.find('input').val(); }

	set value(v) { this.el.find('input').val(v); }
}

class Email extends Text {
	boot(el, params) {
		super.boot(el, Object.assign({inputType: 'email'}, params));
	}
}

class Password extends Text {
	boot(el, params) {
		super.boot(el, Object.assign({inputType: 'password'}, params));
	}
}

class Textarea extends Element {
	boot(el, params) {
		super.boot(el, params);

		el.append('<textarea id="' + this.id + '">' + (params.value || params.default || '') + '</textarea>');
	}

	get value() { return this.el.find('textarea').val(); }

	set value(v) { this.el.find('textarea').val(v); }
}

export default class Form {
	#el;
	#elements = [];

	constructor(params) {
		Object.assign(this, params);
	}

	get el() { return this.#el; }

	addElement(element) {
		this.#elements.push(element);

		if (this.data && this.data[element.name])
			element.value = this.data[element.name];

		return this;
	}

	text(name, params) { return this.addElement(new Text(name, params)); }

	email(name, params) { return this.addElement(new Email(name, params)); }

	password(name, params) { return this.addElement(new Password(name, params)); }

	textarea(name, params) { return this.addElement(new Textarea(name, params)); }

	show() {
		const wrap = $('<div class="shadow"></div>').appendTo(document.body);
		const win = $('<div class="window window-form">'
			+ '<div class="window-title">' + this.title + '</div>'
			+ '<div class="window-body"></div>'
			+ '<div class="window-buttons">'
			+ '<button data-action="submit" class="btn btn-submit">Сохранить</button>'
			+ '<button data-action="cancel" class="btn btn-cancel">Отмена</button>'
			+ '</div>'
			+ '</div>').appendTo(wrap);
		const form = win.find('div.window-body');

		win.find('button.btn-submit').click(() => {
			let data = {};
			this.#elements.forEach((elm) => { data[elm.name] = elm.value; });
			this.submit(data);
		});
		win.find('button.btn-cancel').click(() => { this.hide(); });

		this.#elements.forEach((elm) => { form.append(elm.el); });

		this.#el = wrap;
	}

	hide() {
		this.#el.remove();
		this.#el = null;
	}

	setLoading(flag) {
		this.#el.find('>div.window')[flag ? 'addClass' : 'removeClass']('loading');
	}

}

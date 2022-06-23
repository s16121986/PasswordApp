import Text from "./elements/text";
import Password from "./elements/password";
import Email from "./elements/email";
import Textarea from "./elements/textarea";
import Tags from "./elements/tags";

export default class Form {
	#el;
	#params;
	#elements = [];

	constructor(params) {
		this.#params = params;

		if (params.visible)
			this.show();
	}

	get el() { return this.#el; }

	set(name, value) {
		this.#params[name] = value;
		return this;
	}

	get(name) { return this.#params[name]; }

	title(title) { return this.set('title', title); }

	data(data) {
		this.set('data', data);
		this.#elements.forEach(el => { el.value = data[el.name]; });
		return this;
	}

	submit(fn) { return this.set('submit', fn); }

	addElement(element) {
		this.#elements.push(element);

		const data = this.#params.data;
		if (data && data[element.name])
			element.value = data[element.name];

		return this;
	}

	text(name, params) { return this.addElement(new Text(name, params)); }

	email(name, params) { return this.addElement(new Email(name, params)); }

	password(name, params) { return this.addElement(new Password(name, params)); }

	textarea(name, params) { return this.addElement(new Textarea(name, params)); }

	tags() { return this.addElement(new Tags()); }

	show() {
		const params = this.#params;
		const wrap = $('<div class="shadow"></div>').appendTo(document.body);
		const win = $('<div class="window window-form">'
			+ '<div class="window-title">' + params.title + '</div>'
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
			params.submit(data, this);
		});
		win.find('button.btn-cancel').click(() => { this.hide(); });

		this.#elements.forEach((elm) => { form.append(elm.el); });

		this.#el = wrap;
	}

	hide() {
		this.#el.remove();
		this.#el = undefined;
		this.#elements = undefined;
	}

	setLoading(flag) {
		this.#el.find('>div.window')[flag ? 'addClass' : 'removeClass']('loading');
	}

}

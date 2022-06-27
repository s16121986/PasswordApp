import Text from "./elements/text";
import Password from "./elements/password";
import File from "./elements/file";
import Email from "./elements/email";
import Textarea from "./elements/textarea";
import Tags from "./elements/tags";
import Popup from "../popup";

export default class Form extends Popup {
	#elements = [];

	constructor(params) {
		super(Object.assign({
			hideAction: 'destroy'
		}, params));
	}

	data(data) {
		this.set('data', data);
		this.#elements.forEach(el => { el.value = data[el.name]; });
		return this;
	}

	getElement(name) { return this.#elements.find(el => el.name === name); }

	addElement(element) {
		this.#elements.push(element);

		const data = this.get('data');
		if (data && data[element.name])
			element.value = data[element.name];

		return this;
	}

	text(name, params) { return this.addElement(new Text(name, params)); }

	email(name, params) { return this.addElement(new Email(name, params)); }

	password(name, params) { return this.addElement(new Password(name, params)); }

	file(name, params) { return this.addElement(new File(name, params)); }

	textarea(name, params) { return this.addElement(new Textarea(name, params)); }

	tags() { return this.addElement(new Tags()); }

	boot(el, body) {
		el.append('<div class="window-buttons">'
			+ '<button data-action="submit" class="btn btn-submit">Сохранить</button>'
			+ '<button data-action="cancel" class="btn btn-cancel">Отмена</button>'
			+ '</div>');

		el.find('button.btn-submit').click(async () => {
			let data = {};
			this.#elements.forEach((elm) => { data[elm.name] = elm.value; });

			try {
				const res = this.get('submit')(data, this);
				if (res instanceof Promise)
					await res;
			} catch (e) {
				this.error(e);
				this.setLoading(false);
			}
		});
		el.find('button.btn-cancel').click(() => { this.hide(); });

		this.#elements.forEach((elm) => { body.append(elm.el); });
	}

	error(err) {
		let errorEl = this.el.find('div.error');
		if (errorEl.length === 0)
			errorEl = $('<div class="error"></div>').prependTo(this.el.find('div.window-body'));

		errorEl.html(err);
	}

	destroy() {
		super.destroy();
		this.#elements = undefined;
	}

}

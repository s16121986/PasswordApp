import Text from "./elements/text";
import Password from "./elements/password";
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

	submit(fn) { return this.set('submit', fn); }

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

	textarea(name, params) { return this.addElement(new Textarea(name, params)); }

	tags() { return this.addElement(new Tags()); }

	boot(el, body) {
		el.append('<div class="window-buttons">'
			+ '<button data-action="submit" class="btn btn-submit">Сохранить</button>'
			+ '<button data-action="cancel" class="btn btn-cancel">Отмена</button>'
			+ '</div>');

		el.find('button.btn-submit').click(() => {
			let data = {};
			this.#elements.forEach((elm) => { data[elm.name] = elm.value; });
			this.get('submit')(data, this);
		});
		el.find('button.btn-cancel').click(() => { this.hide(); });

		this.#elements.forEach((elm) => { body.append(elm.el); });
	}

	destroy() {
		this.#elements = undefined;
	}

}

import Element from "./element";

export default class Textarea extends Element {
	boot(el, params) {
		super.boot(el, params);

		el.append('<textarea id="' + this.id + '">' + (params.value || params.default || '') + '</textarea>');
	}

	get value() { return this.el.find('textarea').val(); }

	set value(v) { this.el.find('textarea').val(v); }
}

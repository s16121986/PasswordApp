import Element from "./element";

export default class Text extends Element {
	boot(el, params) {
		super.boot(el, params);

		el.append('<input type="' + (params.inputType || 'text') + '" autocomplete="new-password"'
			+ ' name="' + this.id + '" id="' + this.id + '"'
			+ ' value="' + (params.value || params.default || '') + '" />');
	}

	get value() { return this.el.find('input').val(); }

	set value(v) { this.el.find('input').val(v); }

	get input() { return this.el.find('input'); }

	select() { this.input.select(); }
}

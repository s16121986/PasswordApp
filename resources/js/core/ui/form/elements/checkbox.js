import Element from "./element";

export default class Checkbox extends Element {
	boot(el, params) {
		super.boot(el, params);

		/*el.append('<input type="checkbox"'
			+ ' name="' + this.id + '" id="' + this.id + '"'
			+ ' value="1" />');*/

		let html = '<select name="' + this.id + '" id="' + this.id + '">';
		html += '<option value="true">Да</option>';
		html += '<option value="false" selected>Нет</option>';
		html += '</select>';
		el.append(html);
	}

	get value() { return this.el.find('select').val() === 'true'; }

	set value(v) { this.el.find('select').val(v ? 'true' : 'false'); }
}

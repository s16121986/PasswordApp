export default class Group {
	constructor(params) {
		this.el = $('<div class="group">'
			+ '<div class="group-title">' + params.title + '</div>'
			+ '<div class="group-body"></div>'
			+ '</div>');
	}

	addElement(el) {
		this.el.find('div.group-body').append(el);
		return this;
	}

	action(params) {
		const el = $('<div class="item ' + params.cls + '">' + params.text + '</div>');

		el.click(e => params.handler.call(el, params));

		return this.addElement(el);
	}
}

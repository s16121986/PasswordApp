const className = 'ui-progressbar';

export default class Progressbar {
	constructor() {
		this.el = $('<div class="ui-progressbar"></div>')
			.hide()
			.appendTo(document.body);
	}

	error(params) {
		return this.show(Object.assign({
			cls: 'error',
			text: 'Ошибка'
		}, params));
	}

	show(params) {
		this.el.attr('class', className + ' ' + params.cls);
		this.el.html(params.text);

		if (params.loading)
			this.el.addClass('loading');

		if (params.timeout)
			window.setTimeout(() => {
				this.el.fadeOut(() => { this.hide(); });
			}, params.timeout);

		return this;
	}

	hide() {
		this.el
			.removeClass('loading')
			.hide();

	}
}

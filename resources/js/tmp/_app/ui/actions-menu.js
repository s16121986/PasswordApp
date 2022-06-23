const colors = {
	yellow: 'Желтый',
	green: 'Зеленый',
	blue: 'Синий',
	red: 'Красный'
};

export default class ActionsMenu {
	#el;
	#model;
	#odc;

	constructor(model) {
		this.#model = model;
		this.#el = $('<div class="list-menu popup"></div>');
	}

	get el() { return this.#el; }

	get model() { return this.#model; }

	addItem(params) {
		$('<a href="#" class="' + params.cls + '">' + params.text + '</a>')
			.click((e) => {
				e.preventDefault();
				e.stopPropagation();
				params.handler();
				this.hide();
			})
			.appendTo(this.#el);

		return this;
	}

	favorite(handler) { return this.addItem({handler: handler, text: 'В избранное', cls: 'favorite'}); }

	edit(handler) { return this.addItem({handler: handler, text: 'Изменить', cls: 'edit'}); }

	delete(handler) { return this.addItem({handler: handler, text: 'Удалить', cls: 'delete'}); }

	colors(handler) {
		let html = '<div class="colors">';
		for (let i in colors) {
			html += '<a href="#" class="' + i + '"></a>';
			//this.addItem({url: url + i, text: colors[i], cls: 'color ' + i});
		}
		html += '</div>';

		$(html)
			.appendTo(this.#el)
			.find('a').click(function (e) {
			e.preventDefault();
			handler();
		});

		return this;
	}

	hr() {
		this.#el.append('<hr/>');
		return this;
	}

	isHidden() { return this.#el.is(':hidden'); }

	show() {
		this.#el.show();
		$(document).click(this.#odc = (e) => {
			if (!this.#el.is(e.target) && !this.#el.find(e.target).length)
				this.hide();
		});
	}

	hide() {
		this.#el.hide();
		$(document).unbind('click', this.#odc);
	}

	destroy() {
		this.hide();
		this.#el.remove();
		this.#el = null;
	}
}

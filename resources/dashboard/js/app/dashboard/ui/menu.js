let activeMenu;

function ondocumentclick(e) { activeMenu.hide(); }

export default class Menu {
	#el;

	constructor(params) {
		params = Object.assign({}, params);
		this.#el = $('<div class="list-menu popup ' + (params.cls || '') + '"></div>')
			.click(e => { e.stopPropagation(); })
			.appendTo(document.body);
	}

	get el() { return this.#el; }

	addItem(params) {
		if (params.items)

			$('<a href="#" class="' + params.cls + '">' + params.text + '</a>')
				.click((e) => {
					e.preventDefault();
					e.stopPropagation();
					params.handler(this);
					this.hide();
				})
				.appendTo(this.#el);

		return this;
	}

	hr() {
		this.#el.append('<hr/>');
		return this;
	}

	isHidden() { return this.#el.is(':hidden'); }

	show(pos) {
		if (activeMenu)
			activeMenu.hide();
		activeMenu = this;
		this.#el.show();
		$(document).click(ondocumentclick);

		if (pos)
			this.position(pos);
	}

	position(pos) {
		let y = pos.y;
		if (pos.y + this.el.outerHeight() > $(document).height())
			y -= this.el.outerHeight();
		this.#el.css({
			left: pos.x,
			top: y
		});
	}

	hide() {
		this.#el.hide();
		$(document).unbind('click', ondocumentclick);
	}

	toggle() {
		if (this.isHidden())
			this.show();
		else
			this.hide();
	}

	destroy() {
		if (activeMenu === this)
			activeMenu = undefined;

		$(document).unbind('click', ondocumentclick);

		this.#el.remove();
		this.#el = undefined;
	}
}

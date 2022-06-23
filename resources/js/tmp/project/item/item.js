import ActionsMenu from "../ui/actions-menu"

let expanded;

function collapse(e) {
	if (!expanded || expanded.el.is(e.target) || expanded.el.find(e.target).length)
		return;

	expanded.collapse();
}

export default class Item {
	#el;
	#menu;

	constructor(el) {
		this.#el = el;
		this.#menu = new ActionsMenu();

		this.id = el.data('id');

		const head = el.find('div.head')
			.click(e => {
				e.stopPropagation();
				this.expand();
			});

		head.append('<div class="spacer"></div>')
			.append(this.#menu.el);

		this.bootMenu(this.#menu);

		el.find('div.x-copy').click(function (e) {
			e.stopPropagation();
			copy($(this), $(this).text());
		});

		el.find('div.btn-password').click(function (e) {
			e.stopPropagation();
			copy($(this), $(this).data('password'));
		});
	}

	get el() { return this.#el; }

	get head() { return this.#el.find('div.head'); }

	get menu() { return this.#menu; }

	bootMenu() {

	}

	collapse() {
		this.#el.removeClass('expanded');
		if (expanded === this)
			expanded = null;

		$(document).unbind('click', collapse);
	}

	expand() {
		if (expanded && expanded !== this)
			expanded.collapse();

		if (this.#el.hasClass('expanded')) {
			this.collapse();
		} else {
			this.#el.addClass('expanded');
			expanded = this;
			$(document).click(collapse);
		}
	}
}

import BaseItem from "./item"
import View from "./note/view";

export default class Note extends BaseItem {
	#view;

	constructor(model) {
		super(model, {
			cls: 'note'
		});

		this.#view = new View(this);
	}

	boot(el) {
		//el.append('<div class="name">' + this.get('name') + '</div>');
	}

	click() { this.#view.toggle(); }

	destroy() {
		this.#view.destroy();
		this.#view = undefined;
		super.destroy();
	}
}

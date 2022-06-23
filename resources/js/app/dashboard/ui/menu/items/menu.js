import Menu from "../menu";
import Item from "../item";

export default class MenuItem extends Item {
	#menu;

	constructor(params) {
		super(params);

		if (params.menu)
			this.#menu = params.menu;
		else if (params.items)
			this.#menu = new Menu(params);

		this.el.append(this.#menu.el);
		if (this.#menu.isEmpty())
			this.disable();
	}

	get menu() { return this.#menu; }

	destroy() {
		if (this.#menu)
			this.#menu.destroy();
		super.destroy();
	}
}

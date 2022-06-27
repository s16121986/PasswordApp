import BaseItem from "./item"
import Passwords from "./support/passwords";


export default class Site extends BaseItem {
	#passwords;

	constructor(model) {
		super(model, {
			cls: 'site'
		});

		this.#passwords = new Passwords(this);
	}

	get passwords() { return this.#passwords; }

	boot(el) {
		this.row
			.append('<a href="' + this.get('url') + '" class="btn btn-link" target="_blank"></a>')
			.find('a').click((e) => { e.stopPropagation(); });
	}

	click() { this.#passwords.toggle(); }

	update() {
		super.update();
		this.row.find('a').attr('href', this.model.get('url'));
	}

	destroy() {
		this.#passwords.destroy();
		this.#passwords = undefined;

		super.destroy();
	}
}

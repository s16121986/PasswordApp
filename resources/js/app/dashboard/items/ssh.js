import BaseItem from "./item"
import Password from "./password";
import Passwords from "./support/passwords";

export default class Ssh extends BaseItem {
	#passwords;

	constructor(model) {
		super(model, {
			cls: 'ssh'
		});

		this.#passwords = new Passwords(this);
	}

	get passwords() { return this.#passwords; }

	boot(el) {
		el.find('div.name').append('<span class="ip">' + this.get('ip') + '</span>');
	}

	click() { this.#passwords.toggle(); }

	update() {
		super.update();
		this.row.find('span.ip').html(this.model.get('ip'));
	}

	destroy() {
		this.#passwords.destroy();
		this.#passwords = undefined;

		super.destroy();
	}
}

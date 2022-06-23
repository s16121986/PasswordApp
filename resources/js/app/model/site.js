import Model from "./concerns/entity";
import Collection from "../support/collection";
import Password from "./password";

export default class Site extends Model {
	#passwords;

	constructor(data) {
		super(data, 'site');

		this.#passwords = new Collection();

		if (data && data.passwords)
			data.passwords.forEach(p => { this.#passwords.add(new Password(this, p)); });
	}

	get passwords() { return this.#passwords; }

	hasTerm(term) {
		return this.get('name').includes(term)
			|| this.get('url').includes(term)
			|| !!this.#passwords.find(p => p.hasTerm(term));
	}

	serialize() {
		const data = super.serialize();
		data.passwords = this.#passwords.serialize();
		return data;
	}
}

import Model from "./concerns/model";

export default class Password extends Model {
	constructor(parent, data) {
		super(data, 'password');

		this.parent = parent;
	}

	get name() { return this.get('login'); }

	hasTerm(term) { return this.get('login').includes(term); }

	toString() { return this.get('login'); }
}

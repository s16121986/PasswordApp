import Model from "./concerns/entity";

export default class Email extends Model {
	constructor(data) {super(data, 'email');}

	get name() { return this.get('email'); }

	hasTerm(term) { return this.get('email').includes(term); }

	toString() { return this.get('email'); }
}

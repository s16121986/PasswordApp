import Model from "./concerns/entity";

export default class Note extends Model {
	constructor(data) {super(data, 'note');}

	hasTerm(term) { return this.get('name').includes(term) || this.get('text').includes(term); }

}

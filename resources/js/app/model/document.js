import Model from "./concerns/entity";

export default class Doc extends Model {
	constructor(data) {
		super(data, 'document');

	}
}

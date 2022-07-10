import Base from "../view"
import List from "./list";

export default class View extends Base {
	constructor() {
		super('home');
	}

	boot(el) {
		this.list = new List(this);

		el.append(this.list.el);

		this.update();
	}

	update() {
		this.list.update();
	}

	filter() {
		this.list.filter();
	}

}

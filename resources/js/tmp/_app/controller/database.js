import Controller from "./controller";
import List from "../view/site/list";

export default class Database extends Controller {
	list(id) {
		const site = site(id);
		if (!site)
			return abort(404);

		super.list(new List(site));
	}

	edit() {}

	delete() {}
}

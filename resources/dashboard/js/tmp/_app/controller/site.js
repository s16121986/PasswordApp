import Controller from "./controller";
import Form from "../view/site/form";
import SiteModel from "../model/site";
import actionCreate from "./action/create";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";

export default class Site extends Controller {

	create(parent) {
		actionCreate({
			formFactory: Form,
			parent: parent,
			path: 'site',
			title: 'Новый сайт',
			modelFactory: SiteModel,
			collection: app().sites
		});
	}

	edit(site) {
		actionEdit({
			formFactory: Form,
			path: 'site',
			model: site
		});
	}

	delete(site) {
		actionDelete({
			confirm: 'Удалить сайт?',
			path: 'site',
			model: site,
			collection: app().sites
		});
	}
}

import Controller from "./controller";
import List from "../view/ssh/list";
import Form from "../view/ssh/form";
import SshModel from "../model/ssh";
import actionCreate from "./action/create";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";

export default class Ssh extends Controller {
	list(id) {
		const ssh = app().ssh.get(id);
		if (!ssh)
			return abort(404);

		super.list(new List(ssh));
	}

	create(parent) {
		actionCreate({
			formFactory: Form,
			parent: parent,
			path: 'ssh',
			title: 'Новый ssh',
			modelFactory: SshModel,
			collection: app().ssh
		});
	}

	edit(ssh) {
		actionEdit({
			formFactory: Form,
			path: 'ssh',
			model: ssh
		});
	}

	delete(ssh) {
		actionDelete({
			confirm: 'Удалить ssh?',
			path: 'ssh',
			model: ssh,
			collection: app().ssh
		});
	}
}

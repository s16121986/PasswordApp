import Controller from "./controller";
import Form from "../view/email/form";
import EmailModel from "../model/email";
import actionCreate from "./action/create";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";

export default class Email extends Controller {

	create(parent) {
		actionCreate({
			formFactory: Form,
			parent: parent,
			path: 'email',
			title: 'Новый email',
			modelFactory: EmailModel,
			collection: app().emails
		});
	}

	edit(email) {
		actionEdit({
			formFactory: Form,
			path: 'email',
			model: email
		});
	}

	delete(email) {
		actionDelete({
			confirm: 'Удалить email?',
			path: 'email',
			model: email,
			collection: app().emails
		});
	}
}

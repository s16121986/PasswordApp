import Controller from "./controller";
import actionCreate from "./action/create";
import Form from "../view/document/form";
import DocumentModel from "../model/document";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";

export default class Document extends Controller {
	create(parent) {
		actionCreate({
			formFactory: Form,
			parent: parent,
			path: 'document',
			title: 'Новый документ',
			modelFactory: DocumentModel,
			collection: app().documents
		});
	}

	edit(doc) {
		actionEdit({
			formFactory: Form,
			path: 'document',
			model: doc
		});
	}

	delete(doc) {
		actionDelete({
			confirm: 'Удалить документ?',
			path: 'document',
			model: doc,
			collection: app().documents
		});
	}
}

import Controller from "./controller";
import List from "../view/folder/list";
import Form from "../view/folder/form";
import FolderModel from "../model/folder";
import actionEdit from "./action/edit";
import actionCreate from "./action/create";
import actionDelete from "./action/delete";

export default class Folder extends Controller {
	list(id) {
		const site = app().folders.get(id);
		if (!site)
			return abort(404);

		super.list(new List(site));
	}

	create(parent) {
		actionCreate({
			formFactory: Form,
			parent: parent,
			path: 'folder',
			title: 'Новая папка',
			modelFactory: FolderModel,
			collection: app().folders
		});
	}

	edit(folder) {
		actionEdit({
			formFactory: Form,
			path: 'folder',
			model: folder
		});
	}

	delete(folder) {
		actionDelete({
			confirm: 'Удалить категорию?',
			path: 'folder',
			model: folder,
			collection: app().folders
		});
	}
}

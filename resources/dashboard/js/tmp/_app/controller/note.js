import Controller from "./controller";
import Form from "../view/note/form";
import NoteModel from "../model/note";
import actionCreate from "./action/create";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";
import View from "../view/note/view";

export default class Note extends Controller {
	view(id) {
		const note = app().notes.get(id);
		if (!note)
			return abort(404);

		dashboard().page(new View(note));
	}

	create(parent) {
		actionCreate({
			formFactory: Form,
			parent: parent,
			path: 'note',
			title: 'Новый email',
			modelFactory: NoteModel,
			collection: app().notes
		});
	}

	edit(note) {
		actionEdit({
			formFactory: Form,
			path: 'note',
			model: note
		});
	}

	delete(note) {
		actionDelete({
			confirm: 'Удалить email?',
			path: 'note',
			model: note,
			collection: app().notes
		});
	}
}

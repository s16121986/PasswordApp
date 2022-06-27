import BaseItem from "../default/item"
import PasswordController from "../../controller/password";
import NoteController from "../../controller/note";

export default class Item extends BaseItem {
	constructor(model) {
		super(model, {
			cls: 'note'
		});
	}

	boot(el) {
		//el.append('<div class="name">' + this.get('name') + '</div>');
	}

	bootMenu(menu) {
		menu
			.edit(() => { NoteController.callAction('edit', this.model); })
			//.colors()
			.hr()
			.delete(() => { NoteController.callAction('delete', this.model); });
	}

	click() { route('note.view', {id: this.model.id}); }
}

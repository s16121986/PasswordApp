import SiteController from "../../controller/site";
import SshController from "../../controller/ssh";
import EmailController from "../../controller/email";
import NoteController from "../../controller/note";
import DocumentController from "../../controller/document";
import DatabaseController from "../../controller/database";
import FolderController from "../../controller/folder";

export default function bootMenu(menu) {
	menu
		.edit(() => { FolderController.callAction('edit', menu.model); })
		.addItem({
			text: 'Добавить папку',
			cls: 'folder',
			handler: () => { FolderController.callAction('create', menu.model); }
		})
		.hr()
		.addItem({
			text: 'Добавить сайт',
			cls: 'site',
			handler: () => { SiteController.callAction('create', menu.model); }
		})
		.addItem({
			text: 'Добавить ssh',
			cls: 'ssh',
			handler: () => { SshController.callAction('create', menu.model); }
		})
		.addItem({
			text: 'Добавить email',
			cls: 'email',
			handler: () => { EmailController.callAction('create', menu.model); }
		})
		.addItem({
			text: 'Добавить заметку',
			cls: 'note',
			handler: () => { NoteController.callAction('create', menu.model); }
		})
		.addItem({
			text: 'Добавить документ',
			cls: 'document',
			handler: () => { DocumentController.callAction('create', menu.model); }
		})
		/*.addItem({
			text: 'Добавить базу данных',
			cls: 'database',
			handler: () => { DatabaseController.callAction('create', menu.model); }
		})*/
		.hr()
		.colors((color) => { FolderController.callAction('color', menu.model, color); })
		.hr()
		.delete(() => { FolderController.callAction('delete', menu.model); });
}

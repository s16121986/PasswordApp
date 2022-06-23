import IndexController from "../app/controller";

window.$ = window.jQuery = require('jquery');
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");

import "../core/functions"
import "../app/functions"

import Router from "../app/router";
import ProjectController from "../app/controller/project";
import SiteController from "../app/controller/site";
import SshController from "../app/controller/ssh";
import EmailController from "../app/controller/email";
import NoteController from "../app/controller/note";
import FolderController from "../app/controller/folder";

const router = Router.getInstance();

router
	.add('/', [IndexController, 'dashboard']);

const crud = (n, controller) => {
	router
		.add('/' + n + '/{id}/edit', [controller, 'edit'], n + '.edit')
		.add('/' + n + '/{id}/delete', [controller, 'delete'], n + '.delete');
};

crud('project', ProjectController);
router.add('/project/{id}', [ProjectController, 'list'], 'project.list');

crud('folder', FolderController);
router.add('/folder/{id}', [FolderController, 'list'], 'folder.list');

crud('site', SiteController);
crud('ssh', SshController);
crud('email', EmailController);
crud('note', NoteController);
router.add('/note/{id}', [NoteController, 'view'], 'note.view');

$(document).ready(function () {
	app()
		.ready(function () {
			router.run();

			$(document.body).removeClass('loading');
		})
		.update();

	/*navigator.serviceWorker.register('/sw.js')
		.then(() => {
			console.log('SW registration successful 😍');
		}, err => {
			console.error('SW registration failed 😠', err)
		});*/
});

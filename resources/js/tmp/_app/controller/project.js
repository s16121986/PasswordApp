import Controller from "./controller";
import List from "../view/project/list";
import Form from "../view/project/form";
import ProjectModel from "../model/project";
import actionCreate from "./action/create";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";

export default class Project extends Controller {
	list(id) {
		const project = app().projects.get(id);
		if (!project)
			return abort(404);

		super.list(new List(project));
	}

	create() {
		actionCreate({
			formFactory: Form,
			path: 'project',
			title: 'Новый проект',
			modelFactory: ProjectModel,
			collection: app().projects
		});
	}

	edit(project) {
		actionEdit({
			formFactory: Form,
			path: 'project',
			model: project
		});
	}

	delete(project) {
		actionDelete({
			confirm: 'Удалить проект?',
			path: 'project',
			model: project,
			collection: app().projects
		});
	}
}

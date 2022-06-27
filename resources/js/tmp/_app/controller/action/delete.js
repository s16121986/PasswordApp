import Project from "../../model/project";

export default function actionDelete(params) {
	if (!confirm(params.confirm))
		return;

	const parent = params.model.parent;

	$.post('/' + params.path + '/' + params.model.id + '/delete', (r) => {
		params.collection.remove(params.model);

		if (parent instanceof Project)
			route('project.list', {id: parent.id});
		else
			route('folder.list', {id: parent.id});
	}, 'json');
}

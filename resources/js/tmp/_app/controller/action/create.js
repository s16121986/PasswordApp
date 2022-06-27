import Project from "../../model/project";

export default function actionCreate(params) {
	const form = new params.formFactory({
		title: params.title,
		submit: function (data) {
			this.setLoading(true);

			if (params.parent) {
				if (params.parent instanceof Project)
					data.project_id = params.parent.id;
				else {
					data.project_id = params.parent.project_id;
					data.folder_id = params.parent.id;
				}
			}

			$.post('/' + params.path + '/create', data, (r) => {
				const model = new params.modelFactory(r);
				params.collection.add(model);
				dashboard().update();
				//route('folder.list', {id: folder.id});
				this.hide();
			}, 'json');
		}
	});
	form.show();
}

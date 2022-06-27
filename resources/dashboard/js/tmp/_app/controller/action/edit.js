export default function actionEdit(params) {
	const form = new params.formFactory({
		title: params.model.name,
		data: params.model.data,
		submit: function (data) {
			this.setLoading(true);
			$.post('/' + params.path + '/' + params.model.id + '/edit', data, (r) => {
				params.model.update(r);
				this.hide();
			}, 'json');
		}
	});
	form.show();
}

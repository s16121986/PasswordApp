import Controller from "./controller";
import Form from "../view/password/form";
import PasswordModel from "../model/password";
import actionEdit from "./action/edit";
import actionDelete from "./action/delete";
import Ssh from "../model/ssh";
import Site from "../model/site";
import Project from "../model/project";

function parentToEntity(parent) {
	switch (true) {
		case parent instanceof Ssh:
			return 'App\\Models\\Ssh';
		case parent instanceof Site:
			return 'App\\Models\\Site';
	}
}

export default class Password extends Controller {

	create(parent) {
		const form = new Form({
			title: 'Новый пароль',
			submit: function (data) {
				this.setLoading(true);

				data.entity = parentToEntity(parent);
				data.entity_id = parent.id;

				$.post('/password/create', data, (r) => {
					const model = new PasswordModel(r);
					parent.passwords.add(model);
					dashboard().update();
					this.hide();
				}, 'json');
			}
		});
		form.show();
	}

	edit(password) {
		actionEdit({
			formFactory: Form,
			path: 'password',
			model: password
		});
	}

	delete(password) {
		if (!confirm('Удалить пароль?'))
			return;

		$.post('/password/' + password.id + '/delete', (r) => {
			password.parent.passwords.remove(password);
			dashboard().update();
		}, 'json');
	}
}

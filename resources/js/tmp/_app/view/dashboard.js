import List from "./default/list";
import Site from "./site/item";
import Ssh from "./ssh/item";
import Email from "./email/item";
import Note from "./note/item";
import bootMenu from "./folder/menu"

export default class Dashboard extends List {
	constructor() {
		super(app());
	}

	render() {
		super.render();

		const _app = app();

		const add = (key, itemFactory) => {
			_app[key].forEach((f) => { this.addItem(new itemFactory(f)); });
		};

		add('sites', Site);
		add('ssh', Ssh);
		add('emails', Email);
		add('notes', Note);
	}

	bootMenu(menu) {
		bootMenu(menu);
		/*menu
			.addItem({
				text: 'Добавить проект',
				cls: 'project',
				handler: () => { ProjectController.callAction('create', this.model); }
			});*/
	}
}

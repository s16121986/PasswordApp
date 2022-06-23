import BaseList, {draggable} from "../default/list";
import bootMenu from "./menu"
import Folder from "./item";
import Site from "../site/item";
import Ssh from "../ssh/item";
import Note from "../note/item";
import Email from "../email/item";

export default class List extends BaseList {
	constructor(folder) {
		super(folder, {
			title: folder.name
		});

		folder.bind('change', this.update, this);
	}

	render() {
		super.render();

		const add = (key, itemFactory) => {
			this.model[key].forEach((f) => {
				this.addItem(new itemFactory(f));
			});
		};

		add('folders', Folder);
		add('sites', Site);
		add('ssh', Ssh);
		add('emails', Email);
		add('notes', Note);

		draggable(this);
	}

	bootMenu(menu) { bootMenu(menu); }

	destroy() {
		super.destroy();

		this.model.unbind('change', this.update);
	}
}

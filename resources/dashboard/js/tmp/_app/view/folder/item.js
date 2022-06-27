import BaseItem from "../default/item"
import bootMenu from "./menu"

export default class Item extends BaseItem {
	constructor(model) {
		super(model, {
			name: model.name,
			cls: 'folder'
		});
	}

	boot(el) {

	}

	bootMenu(menu) { bootMenu(menu); }

	click() { route('folder.list', {id: this.model.id}); }
}

import BaseItem from "../default/item"
import bootMenu from "../folder/menu"

export default class Item extends BaseItem {
	constructor(model) {
		super(model, {
			cls: 'project'
		});
	}

	boot(el) {
		//el.append('<div class="name">' + this.get('name') + '</div>');
	}

	bootMenu(menu) { bootMenu(menu); }

	click() { route('project.list', {id: this.model.id}); }
}

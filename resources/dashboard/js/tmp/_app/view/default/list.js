import Project from "../../model/project";
import Folder from "../../model/folder";
import View from "./view";

function itemFromCls(cls, id) {
	switch (cls) {
		case 'item-folder':
			return app().folders.get(id);
		case 'item-site':
			return app().sites.get(id);
		case 'item-ssh':
			return app().ssh.get(id);
		case 'item-email':
			return app().emails.get(id);
		case 'item-note':
			return app().notes.get(id);
	}
}

export function draggable(list) {
	list.el.find('div.item').draggable({
		//axis: 'y',
		//start: function (e) { e.stopPropagation(); },
		//stop: function (e) { e.stopPropagation(); },
		helper: function () {
			const c = this.className.split(' ');
			return $('<div class="item-dragging ' + c[1] + '"></div>')
		},
		containment: list.el
	});

	list.el.find('div.item-folder').droppable({
		hoverClass: 'drop-hover',
		drop: function (event, ui) {
			const folder = app().folders.get(+$(this).data('id'));

			const c = ui.draggable[0].className.split(' ');
			const item = itemFromCls(c[1], ui.draggable.data('id'));

			$.post('/' + c[1].substr(5) + '/' + item.id + '/edit', {folder_id: folder.id}, (r) => {
				item.update(r);
				list.update();
			});
		}
	});

	if (list.model instanceof Folder) {
		list.el.find('div.btn-back').droppable({
			hoverClass: 'drop-hover',
			drop: function (event, ui) {
				const c = ui.draggable[0].className.split(' ');
				const item = itemFromCls(c[1], ui.draggable.data('id'));
				let data = {};

				const parent = list.model.parent;
				if (parent instanceof Project)
					data.folder_id = null;
				else
					data.folder_id = parent.id;

				$.post('/' + c[1].substr(5) + '/' + item.id + '/edit', data, (r) => {
					item.update(r);
					list.update();
				});
			}
		});
	}
};

export default class List extends View {
	#items = [];

	get items() { return this.#items; }

	update() {
		this.items.forEach(item => item.destroy());
		this.#items = [];

		super.update();
	}

	destroy() {
		this.items.forEach(item => item.destroy());
		this.#items = [];

		super.destroy();
	}

	addItem(item) {
		this.#items.push(item);
		this.content.append(item.el);
	}
}

import BaseMenu from "@ui/menu/menu";
import Confirm from "../../ui/confirm";

function eachItem(fn, searchTag) {
	const collections = app('data').collections;
	for (let i in collections) {
		collections[i].forEach(item => {
			const i = item.tags.findIndex(tag => tag === searchTag);
			if (i > -1)
				fn(item, i);
		});
	}
}

function actionTag(tag, fn) {
	eachItem(fn, tag);
	app('data').store();
	app('sidebar').update();
}

function replaceTag(curText, newText) {
	actionTag(curText, (item, i) => { item.tags[i] = newText; });
}

function editTag(item) {
	const el = $(item.tag).addClass('edited');
	const text = el.data('tag');
	const html = el.html();
	const input = $('<input type="text" />')
		.val(text)
		.click(e => { e.stopPropagation(); })
		.keydown(e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				input.blur();
			} else if (e.key === 'Escape')
				input.val(text).blur();
		})
		.blur(() => {
			const val = input.val();
			if (val === '' || val === text) {
				el.html(html);
			} else {
				el.html(val);
				replaceTag(text, val);
			}
			el.removeClass('edited');
		});

	el.html(input);
	input.select();
}

function deleteTag(item) {
	const el = $(item.tag);
	const text = el.data('tag');
	Confirm('Удалить тег "' + text + '"?', () => {
		actionTag(text, (item, i) => { item.tags.splice(i, 1); });
	});
}

export default class Menu extends BaseMenu {
	constructor(tagEl) {
		super({
			hideAction: 'destroy'
		});

		this.el.appendTo(document.body);

		this
			.defaultItem({
				data: {tag: tagEl},
				handler: editTag,
				text: 'Изменить',
				cls: 'edit'
			})
			.defaultItem({
				data: {tag: tagEl},
				handler: deleteTag,
				text: 'Удалить',
				cls: 'delete'
			});
	}
}

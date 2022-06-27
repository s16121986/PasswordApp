import Header from "./ui/header"
import Site from "./items/site";
import Ssh from "./items/ssh";
import Email from "./items/email";
import Note from "./items/note";
import Settings from "./settings/dialog";

let items = [];

function onItemRemove() {
	const i = items.findIndex(item => item.model === this);
	if (i === -1)
		return;
	items[i].destroy();
	items.splice(i, 1);
}

function sort(a, b) {
	const af = a.isFavorite;
	const bf = b.isFavorite;
	if (af && !bf)
		return -1;
	else if (!af && bf)
		return 1;

	return a.name > b.name ? 1 : (a.name === b.name ? 0 : -1);
}

export default class Dashboard {
	#el;
	#header;
	#content;

	constructor() {
		this.#el = $('<div class="dashboard"></div>').appendTo(document.body);
		this.#header = new Header();

		this.#el.append(this.#header.el);
		this.#content = $('<section></section>').appendTo(this.#el);

		this.settings = new Settings();
	}

	get content() { return this.#content; }

	get header() { return this.#header; }

	get items() { return items; }

	remove(item) {
		const i = items.findIndex(it => it === item);
		items[i].destroy();
		items.splice(i, 1);
	}

	update() {
		const wrap = this.#content;
		const data = app('data');

		const add = (key, itemFactory) => {
			data.get(key)
				.sort(sort)
				.map(model => {
					model.bind('destroy', onItemRemove);
					return new itemFactory(model);
				})
				.forEach(item => {
					items.push(item);
					wrap.append(item.el);
				});
		};

		items.forEach(item => {
			item.model.unbind('destroy', onItemRemove);
			item.destroy();
		});
		items = [];

		add('sites', Site);
		add('ssh', Ssh);
		add('emails', Email);
		add('notes', Note);

		this.filter();

		this.header.update();
	}

	filter() {
		const filters = this.#header.filters;
		const trueFn = () => true;
		const isFavorite = filters.favorite
			? m => m.isFavorite
			: trueFn;
		const isNoTag = filters.noTag
			? m => m.tags.length === 0
			: trueFn;
		const isArchive = filters.archive
			? trueFn
			: m => !m.isArchive;
		const hasTags = filters.tags.length > 0
			? m => {
				const mtags = m.tags;
				if (!mtags || mtags.length === 0)
					return false;
				return !filters.tags.find(tag => !mtags.includes(tag))
			}
			: trueFn;
		const hasTerm = filters.term
			? m => m.hasTerm(filters.term)
			: trueFn;

		items.forEach(item => {
			const model = item.model;
			if (hasTags(model)
				&& hasTerm(model)
				&& isFavorite(model)
				&& isNoTag(model)
				&& isArchive(model))
				item.show();
			else
				item.hide();
		});
	}

}

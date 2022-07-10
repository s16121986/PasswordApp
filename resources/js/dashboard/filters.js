let currentFilters = {
	favorite: true,
	noTag: false,
	archive: false,
	term: null,
	tags: []
};

function boot() {
	const data = localStorage.getItem('filters');
	if (!data)
		return;

	Object.assign(currentFilters, JSON.parse(data));
}

export default class Filters {
	constructor() {
		boot();

		app('filters', this);
	}

	get() { return currentFilters; }

	get favorite() { return currentFilters.favorite; }

	set favorite(flag) { currentFilters.favorite = flag; }

	get noTag() { return currentFilters.noTag; }

	set noTag(flag) {
		currentFilters.noTag = flag;
		if (flag)
			currentFilters.tags = [];
	}

	get archive() { return currentFilters.archive; }

	set archive(flag) { currentFilters.archive = flag; }

	get tags() { return currentFilters.tags; }

	set tags(tags) { currentFilters.tags = tags; }

	get term() { return currentFilters.term; }

	set term(s) { currentFilters.term = s; }

	hasTag(tag) { return currentFilters.tags.includes(tag); }

	toggleTag(tag) {
		const i = currentFilters.tags.findIndex(t => t === tag);
		if (i === -1) {
			currentFilters.noTag = false;
			currentFilters.tags.push(tag);
		} else
			currentFilters.tags.splice(i, 1);

		return i === -1;
	}

	toggleFavorite() { this.favorite = !currentFilters.favorite; }

	toggleNoTag() { this.noTag = !currentFilters.noTag; }

	toggleArchive() { this.archive = !currentFilters.archive; }

	store() { localStorage.setItem('filters', JSON.stringify(currentFilters)); }
}

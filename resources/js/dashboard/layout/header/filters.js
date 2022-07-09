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

function store() {
	localStorage.setItem('filters', JSON.stringify(currentFilters));
}

function toggleTag(tag) {
	const header = app('dashboard').header;

	header.el.find('div.tags>div.' + tag)
		.toggleClass('selected');

	this.update();
}

export default class Filters {
	constructor() {
		boot();

		app('filters', this);
	}

	get() { return currentFilters; }

	get favorite() { return currentFilters.favorite; }

	get noTag() { return currentFilters.noTag; }

	get archive() { return currentFilters.archive; }

	get tags() { return currentFilters.tags; }

	get term() { return currentFilters.term; }

	toggleTag(tag) {
		const header = app('dashboard').header;
		const el = header.el;

		el.find('div.tags').find('div.tag')
			.each(function () {
				if ($(this).data('tag') === tag)
					$(this).toggleClass('selected');
			});

		if (currentFilters.noTag)
			el.find('div.tags').find('div.notag').removeClass('selected');

		this.update();
	}

	toggleFavorite() { toggleTag.call(this, 'favorite'); }

	toggleNoTag() { toggleTag.call(this, 'notag'); }

	toggleArchive() { toggleTag.call(this, 'archive'); }

	update() {
		const header = app('dashboard').header;
		const el = header.el;
		const tagsWrap = el.find('div.tags');

		const favorite = tagsWrap.find('div.favorite').hasClass('selected');
		const noTag = tagsWrap.find('div.notag').hasClass('selected');
		const archive = tagsWrap.find('div.archive').hasClass('selected');
		const term = el.find('input').val() || null;
		let tags = [];
		if (noTag) {
			tagsWrap.find('div.tag.selected').removeClass('selected');
		} else {
			tagsWrap.find('div.tag.selected')
				.each(function () { tags.push($(this).data('tag')); });
		}

		currentFilters = {
			//isEmpty: !favorite && tags.length === 0 && null === term && archive,
			favorite: favorite,
			noTag: noTag,
			archive: archive,
			term: term,
			tags: tags
		};

		store();

		app('dashboard').filter();
	}
}

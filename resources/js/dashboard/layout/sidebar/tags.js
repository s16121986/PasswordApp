import ContextMenu from "./contextmenu";

function searchTags() {
	const collections = app('data').collections;
	let tags = [];
	for (let i in collections) {
		collections[i].forEach(item => {
			item.tags.forEach(tag => {
				const i = tags.findIndex(t => t.tag === tag);
				if (i === -1)
					tags.push({tag: tag, count: 1});
				else
					tags[i].count++;
			})
		})
	}
	return tags;
}

function onChange() {
	app('dashboard').view('home');
	app('dashboard').update();
	app('filters').store();
}

function toggleFlag(el, name) {
	const flag = !app('filters')[name];
	app('filters')[name] = flag;
	tagsInstance.updateSelection();
	onChange();
}

function toggleTag(e) {
	const tag = this.getAttribute('data-tag');

	if (e.ctrlKey || this.classList.contains('selected'))
		app('filters').toggleTag(tag);
	else
		app('filters').tags = [tag];

	tagsInstance.updateSelection();
	onChange();
}

let tagsInstance;

export default class Tags {
	constructor() {
		this.el = $('<nav class="tags"></nav>');

		tagsInstance = this;
		//app('filters').change(() => { this.updateSelection(); });
	}

	get availableTags() {
		let tags = [];
		this.el.find('>div.tag').each(function () {
			tags.push($(this).data('tag'));
		});
		return tags;
	}

	updateSelection() {
		const filtersWrap = this.el;
		const filters = app('filters');

		filtersWrap.find('div.tag')
			.each((i, el) => {
				const tag = el.getAttribute('data-tag')
				el.classList[filters.hasTag(tag) ? 'add' : 'remove']('selected');
			});

		const s = (n) => {
			const flag = filters[n];
			filtersWrap.find('div.' + n)[flag ? 'addClass' : 'removeClass']('selected');
		};

		['favorite', 'noTag', 'archive'].forEach(n => s(n));
	}

	update() {
		const filtersWrap = this.el;
		const filters = app('filters');
		let html = '';


		searchTags()
			.sort((a, b) => (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0))
			.forEach(tag => {
				html += '<div class="tag'
					+ (filters.hasTag(tag.tag) ? ' selected' : '') + '"'
					+ ' data-tag="' + tag.tag + '">'
					+ tag.tag
					+ '<span class="count">' + tag.count + '</span>'
					+ '</div>';
			});
		//html += '<hr />';
		html += '<div class="flag favorite' + (filters.favorite ? ' selected' : '') + '" title="">Избранное</div>';
		html += '<div class="flag archive' + (filters.archive ? ' selected' : '') + '" title="">Архив</div>';
		html += '<div class="flag noTag' + (filters.noTag ? ' selected' : '') + '">Без тега</div>';

		this.el.html(html);

		filtersWrap.html(html)
			.find('div.tag')
			.click(toggleTag)
			.bind('contextmenu', function (e) {
				e.preventDefault();
				const menu = new ContextMenu(this);
				menu.show({x: e.pageX, y: e.pageY});
			});

		filtersWrap.find('div.favorite')
			.click(function (e) { toggleFlag(this, 'favorite'); });

		filtersWrap.find('div.noTag')
			.click(function (e) { toggleFlag(this, 'noTag'); });

		filtersWrap.find('div.archive')
			.click(function (e) { toggleFlag(this, 'archive'); });

	}
}

import Filters from "./header/filters";
import Menu from "../mainmenu/menu";

let inputTimeout;

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

export default class Header {
	#el;
	#filters;
	#menu;

	constructor() {
		this.#filters = new Filters();
		this.#menu = new Menu();

		const el = $('<header>'
			+ '<div class="wrap">'
			+ '<div class="search">'
			+ '<input type="text" autocomplete="off" placeholder="Быстрый поиск" value="' + (this.#filters.term || '') + '" />'
			+ '<div class="btn btn-filter"></div>'
			+ '<div class="btn btn-menu" title="Главное меню"></div>'
			+ '</div>'
			+ '<div class="tags">'
			+ '<div class="favorite selected"></div>'
			+ '</div>'
			+ '</div>'
			+ '</header>');

		this.#el = el;

		el.find('div.wrap').append(this.#menu.el);

		el.find('input').bind('input', e => {
			if (inputTimeout)
				clearTimeout(inputTimeout);

			inputTimeout = window.setTimeout(() => {
				inputTimeout = undefined;
				this.#filters.update();
			}, 300);
		})

		el.find('div.btn-filter').click(e => {
			if (el.hasClass('expanded'))
				el.removeClass('expanded');
			else
				el.addClass('expanded');
			el.trigger('resize');
		});

		el.find('div.btn-menu').click(e => {
			e.stopPropagation();
			this.#menu.toggle();
		});

		this.update();
	}

	get el() { return this.#el; }

	get filters() { return this.#filters; }

	get tags() {
		let tags = [];
		this.#el.find('div.tags>div.tag').each(function () {
			tags.push($(this).data('tag'));
		});
		return tags;
	}

	update() {
		const filtersWrap = this.#el.find('div.tags');
		const filters = this.#filters;

		let html = '';
		html += '<div class="favorite' + (filters.favorite ? ' selected' : '') + '" title="Избранное"></div>';
		html += '<div class="notag' + (filters.noTag ? ' selected' : '') + '">Без тега</div>';

		searchTags()
			.sort((a, b) => (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0))
			.forEach(tag => {
				html += '<div class="tag'
					+ (filters.tags.includes(tag.tag) ? ' selected' : '') + '"'
					+ ' data-tag="' + tag.tag + '">'
					+ tag.tag
					+ '<span class="count">' + tag.count + '</span>'
					+ '</div>';
			});

		html += '<div class="archive' + (filters.archive ? ' selected' : '') + '" title="Архив"></div>';
		filtersWrap.html(html)
			.find('div.tag')
			.click(function (e) { app('filters').toggleTag($(this).data('tag')); });

		filtersWrap.find('div.favorite')
			.click(e => { this.#filters.toggleFavorite(); });

		filtersWrap.find('div.notag')
			.click(e => { this.#filters.toggleNoTag(); });

		filtersWrap.find('div.archive')
			.click(e => { this.#filters.toggleArchive(); });
	}
}

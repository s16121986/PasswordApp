import viewFactory from "./views/factory";
import Sidebar from "./layout/sidebar/sidebar";
import Header from "./layout/header";
import Filters from "./filters";

let currentView;

export default class Dashboard {
	#el;
	#header;

	constructor() {
		const el = $('<div class="dashboard"></div>').appendTo(document.body);
		this.#el = el;

		this.filters = new Filters();

		this.header = new Header();
		el.append(this.header.el);
		this.header.el.fixedHeader({});

		const wrap = $('<section class="wrapper"></section>').appendTo(el);

		this.sidebar = new Sidebar();
		wrap.append(this.sidebar.el)
			.append('<div class="views-wrap"></div>');
	}

	get el() { return this.#el; }

	get availableTags() { return this.sidebar.tags.availableTags; }

	setLoading(flag) { $(document.body)[flag ? 'addClass' : 'removeClass']('loading'); }

	view(name) {
		if (undefined === name)
			return currentView;

		if (currentView) {
			if (currentView.name === name)
				return;

			currentView.hide();
		}

		const view = viewFactory(name);
		if (view.isRendered)
			view.show();
		else
			this.#el.find('div.views-wrap').append(view.el);

		currentView = view;

		location.hash = name === 'home' ? '' : '#' + name;
	}

	filter() {
		currentView.filter();
	}

	update() {
		if (currentView)
			currentView.update();
	}
}

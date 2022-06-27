import IndexController from "./controller/index";
import ProjectController from "./controller/project";

class Route {
	#path;
	#regexp;
	#handler;
	#name;

	constructor(path, handler, name) {
		this.#path = path;
		this.#name = name;
		this.#handler = handler;

		const p = path
			.replace('{id}', '(\\d+)')
			.replaceAll('/', '\\/');

		this.#regexp = new RegExp('^' + p + '$');
	}

	get name() { return this.#name; }

	match(path) { return this.#regexp.test(path); }

	path(args) {
		let path = this.#path;

		if (args) {
			for (let i in args) {
				path = path.replace('{' + i + '}', args[i]);
			}
		}

		return path;
	}

	handle(path) {
		const m = path.match(this.#regexp);
		if (!m)
			return false;

		let args = [];
		if (m[1])
			args[args.length] = +m[1];

		const controller = new this.#handler[0]();

		controller[this.#handler[1]].apply(controller, args);

		return true;
	}
}

export default class Router {
	static #instance;

	static getInstance() { return this.#instance || (this.#instance = new Router()); }

	#routes = [];

	add(path, handler, name) {
		const route = new Route(path, handler, name);
		this.#routes.push(route);
		return this;
	}

	route(name, args) {
		const l = this.#routes.length;

		for (let i = 0; i < l; i++) {
			if (this.#routes[i].name !== name)
				continue;

			const path = this.#routes[i].path(args);
			//history.pushState(null, null, url);

			location.hash = path;

			break;
		}
	}

	request(path) {
		const l = this.#routes.length;

		for (let i = 0; i < l; i++) {
			if (this.#routes[i].handle(path))
				return;
		}
	}

	run() {
		const go = () => {
			const path = location.hash;
			this.request(path ? (path.substr(1) || '/') : '/');
		};

		go();

		window.addEventListener("popstate", (e) => { go(); });
	}
}


/*
export function listFactory(uuid) {
	if (!uuid || uuid === 'home' || uuid === app()) {
		location.hash = '';
		return new Projects();
	} else if (!is_string(uuid))
		uuid = uuid.uuid;

	location.hash = uuid || '';

	const a = uuid.split('-');

	switch (a[0]) {
		case 'project':
			return new Project(app().project(+a[1]));
		case 'folder':
			return new Folder(app().folder(+a[1]));
		case 'site':
			return new Site(app().site(+a[1]));
		case 'email':
			return new Email(app().email(+a[1]));
		case 'ssh':
			return new Ssh(app().ssh(+a[1]));
		case 'note':
			return new Note(app().note(+a[1]));
		default:
			return new Projects();
	}
}

export default function route(uuid) {

}*/

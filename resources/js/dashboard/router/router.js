const routes = [];

function getLocationName() {
	const hash = location.hash;
	if (!hash || hash === '#')
		return 'home';
	else
		return hash.substr(1);
}

export default class Router {
	constructor() {}

	addRoute(name, handler, scope) {
		routes.push({
			name: name,
			handler: handler,
			scope: scope
		});

		return this;
	}

	addViewRoute(name) {
		return this.addRoute(name, route => {
			app('dashboard').view(route.name);
		});
	}

	hasRoute(name) { return !!routes.find(r => r.name === name); }

	execute(name) {
		if (undefined === name)
			name = getLocationName();

		const route = routes.find(r => r.name === name);
		if (!route)
			throw 'Route [' + name + '] not found';

		route.handler.call(route.scope, route);

		location.hash = name === 'home' ? '' : '#' + name;
	}

	boot(route) {
		this.execute(route || getLocationName());

		addEventListener('popstate', event => { this.execute(); });
		//window.addEventListener()
	}
}

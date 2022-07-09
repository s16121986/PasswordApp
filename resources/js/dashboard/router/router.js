const routes = {};

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
			add('dashboard').view(route.name);
		});
	}

	hasRoute(name) { return !!routes.find(r => r.name === name); }

	execute(name) {
		const route = routes.find(r => r.name === name);
		if (!route)
			throw 'Route [' + name + '] not found';

		route.handler.call(route.scope, route);
	}
}

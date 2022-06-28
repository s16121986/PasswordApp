let routes = {};

export default class Router {
	addRoute(route, callback) {
		routes[route] = callback;
		return this;
	}

	hasRoute(route) { return !!routes[route]; };

	async execute(route, ...args) {
		const response = {};

		try {
			response.data = await routes[route].apply(null, args);
			response.status = true;
		} catch (e) {
			response.route = route;
			response.error = true;
			console.error(e);
			response.exception = e;
		}

		return response;
	}
}

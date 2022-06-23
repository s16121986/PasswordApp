export default class Controller {
	static callAction(action) {
		const controller = new this();
		let args = [];
		for (let i = 1; i < arguments.length; i++) {
			args[i - 1] = arguments[i];
		}
		return controller[action].apply(controller, args);
	}

	list(view) {
		dashboard().page(view);
	}
}

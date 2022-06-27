import Storage from "./storage/sync";
import Router from "./router/router";
import bootRouter from "./router/boot";

let readyState = false;
let readyHandlers = [];
let instance;
let instances = {};

export default class Application {
	constructor() {
		this.extensionId = chrome.runtime.id;
		//this.basePath = chrome.runtime.getURL('');

		instance = this;
		instances.storage = new Storage();
		instances.router = new Router();
	}

	async boot() {
		bootRouter(instances.router);

		readyState = true;
		readyHandlers.forEach(h => h.callback.call(h.scope));
		readyHandlers = undefined;
	}

	ready(fn, scope) {
		if (readyState)
			fn.call(scope);
		else
			readyHandlers.push({callback: fn, scope: scope});
	}
}

Object.assign(self, {
	app: (name, data) => {
		if (undefined === name)
			return instance;
		else if (undefined === data)
			return instances[name];
		else
			instances[name] = data;
	}
});

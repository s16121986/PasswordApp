import Data from "./data/data";
import Dashboard from "./dashboard/dashboard";

let instance;
let instances = {};

export default class Application {
	static getInstance(name) {
		if (undefined === name)
			return instance;

		return instances[name];
	}

	static setInstance(name, value) {
		instances[name] = value;
	}

	constructor() {
		instance = this;
		instances.data = new Data();
		instances.dashboard = new Dashboard();
	}
}

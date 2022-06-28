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
	}
}

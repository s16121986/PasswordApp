import Data from "./storage/data";
import Dashboard from "./dashboard/dashboard";
import Broadcast from "./broadcast/broadcast";
import Encoder from "./encrypt/key";
import EncryptKey from "./storage/key";
import PasswordGenerator from "./dashboard/services/password-renerator/dialog";

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
		instances.encryptKey = new EncryptKey();
		instances.data = new Data();
		instances.dashboard = new Dashboard();
		instances.broadcast = new Broadcast();
		instances.encoder = new Encoder();
		instances['password-generator'] = new PasswordGenerator();
	}
}

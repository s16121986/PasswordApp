import Data from "./storage/data";
import Broadcast from "./broadcast/broadcast";
import Encoder from "./encrypt/key";
import EncryptKey from "./storage/key";

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
		instances.broadcast = new Broadcast();
		instances.encryptKey = new EncryptKey();
		instances.encoder = new Encoder();
		instances.data = new Data();
		//instances.settings = new SettingsDialog();
	}
}

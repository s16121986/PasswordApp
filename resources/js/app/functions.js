import Application from "./app";
import utils from "./support/utils";

Object.assign(window, {
	app: (name, value) => {
		if (undefined === value)
			return Application.getInstance(name);
		else
			Application.setInstance(name, value);
	},

	dashboard: (name) => Application.getInstance('dashboard'),

	copy: utils.copy
});

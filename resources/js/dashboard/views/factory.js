import Home from "./main/view"
import Notepad from "./notepad/view"
import Settings from "./settings/view"
import PasswordGenerator from "./password-generator/view"

const views = {
	home: () => new Home(),
	notepad: () => new Notepad(),
	settings: () => new Settings(),
	'password-generator': () => new PasswordGenerator(),
};
const viewsCache = {};

export default (name) => {
	return viewsCache[name] || (viewsCache[name] = views[name]());
}

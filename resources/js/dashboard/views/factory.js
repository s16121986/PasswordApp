import Home from "./main/view"
import Notepad from "./notepad/view"
import PasswordGenerator from "./password-generator/view"

const views = {
	home: () => new Home(),
	notepad: () => new Notepad(),
	'password-generator': () => new PasswordGenerator(),
};

export default (name) => {
	return views[name]();
}

import Text from "./text";

export default class File extends Text {
	boot(el, params) {
		super.boot(el, Object.assign({inputType: 'file'}, params));
	}
}

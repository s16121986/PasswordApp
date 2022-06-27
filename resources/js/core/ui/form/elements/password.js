import Text from "./text";

export default class Password extends Text {
	boot(el, params) {
		super.boot(el, Object.assign({inputType: 'password'}, params));
	}
}

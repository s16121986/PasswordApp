import Text from "./text";

export default class Email extends Text {
	boot(el, params) {
		super.boot(el, Object.assign({inputType: 'email'}, params));
	}
}

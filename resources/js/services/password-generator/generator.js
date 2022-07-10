const availableChars = {
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	numeric: '1234567890',
	symbols: '_=+-*&^%$#@!~:;'
};
const animateTime = 700;
const animateIteration = 3;

function getChars(charsKeys) {
	let chars = '';
	if (charsKeys) {
		for (let i = 0; i < charsKeys.length; i++) {
			chars += availableChars[charsKeys[i]];
		}
	} else {
		for (let i in availableChars) {
			chars += availableChars[i];
		}
	}
	return chars;
}

function getChar(items) { return items.charAt(Math.round(Math.random() * (items.length - 1))); }

function setInputVal(input, password) {
	input.value = password;
	input.select();
	document.execCommand("copy");
}

export default {
	generate: (length, charsKeys) => {
		const chars = getChars(charsKeys);

		let password = '';
		for (let i = 0; i < length; i++) {
			password += getChar(chars);
		}

		return password;
	},

	animate: (input, password) => {
		const charsSet = getChars();
		const l = password.length;
		const dt = animateTime / animateIteration;
		let I = l, K = 0;
		let ti = window.setInterval(function () {
			let s = '';
			for (let j = 0; j < I; j++) { s += getChar(charsSet); }

			for (let j = I; j < l; j++) { s += password.charAt(j); }

			input.value = s;
			K++;
			if (K % animateIteration === 0)
				I--;
			if (I > 0)
				return;

			setInputVal(input, password);

			window.clearInterval(ti);
		}, dt / l);
	},

	set: setInputVal
};

function findInput(inputs, regexp) {
	const l = inputs.length;
	for (let i = 0; i < l; i++) {
		if (regexp.test(inputs[i].name))
			return inputs[i];
	}
}

export default class Autocomplete {
	constructor() {
		const inputs = document.getElementsByTagName('input');
		this.login = findInput(inputs, /^login.*/i);
		if (!this.login)
			return;

		this.password = findInput(inputs, /^(password|passwd|pass|pswd).*/i);
	}

	fill(password) {
		if (!this.isFillable())
			return;

		this.login.value = password.get('login');
		this.password.focus();
		this.password.dispatchEvent(new Event('focus'));
		this.password.value = password.get('password');
		this.password.dispatchEvent(new KeyboardEvent('keydown'));
		this.password.dispatchEvent(new KeyboardEvent('keyup'));
		this.password.dispatchEvent(new KeyboardEvent('keypress'));
		this.password.dispatchEvent(new Event('change'));
		this.password.dispatchEvent(new Event('input'));

		window.setTimeout(() => {
			this.password.blur();
			this.password.dispatchEvent(new Event('blur'));
			this.password.focus();
			this.password.value = password.get('password');
			this.password.dispatchEvent(new Event('change'));
			this.password.dispatchEvent(new Event('input'));
		}, 2000);
	}

	isFillable() { return this.login && this.password; }
}

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

		//this.login.value = password.get('login');
		//setAttribute('value', password.get('password'));

		this.login.select();
		document.execCommand('insertText', false, password.get('login'));

		this.password.select();
		document.execCommand('insertText', false, password.get('password'));
	}

	isFillable() { return this.login && this.password; }
}

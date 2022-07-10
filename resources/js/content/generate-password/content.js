import passwordGenerator from "@services/password-generator/generator"

function execute() {
	const password = passwordGenerator.generate(12);
	const input = document.activeElement;
	passwordGenerator.animate(input, password);
}

execute();

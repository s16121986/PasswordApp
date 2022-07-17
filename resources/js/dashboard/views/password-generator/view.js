import Base from "../view"
import generator from "@services/password-generator/generator";

const defaultLength = 16;

let passwordsCache = [];
let input;
let inputLength;
let inputSettings;
let history;

function loadStorage() {
	const data = sessionStorage.getItem('passwords');
	if (!data)
		return;

	passwordsCache = JSON.parse(data);
}

export default class View extends Base {
	constructor() {
		super('password-generator');

		loadStorage();
	}

	boot(el) {
		const sl = function (name, text) {
			const id = '_ps_s_' + name;
			return '<div class="item">'
				+ '<input id="' + id + '" type="checkbox" checked="checked" value="' + name + '" />'
				+ '<label for="' + id + '">' + text + '</label>'
				+ '</div>';
		};

		const body = el;

		body
			.append('<h1>Генератор паролей</h1>')
			.append('<div class="main">'
				+ '<div class="input-wrap">'
				+ '<input type="number" value="' + defaultLength + '" />'
				+ '<input type="text" readonly />'
				+ '<button type="button"></button>'
				+ '</div>'
				+ '<div class="settings-wrap">'
				+ sl('uppercase', 'ABC')
				+ sl('lowercase', 'abc')
				+ sl('numeric', '123')
				+ sl('symbols', '$#!')
				+ '</div>'
				+ '</div>'
				+ '<div class="history"></div>');

		input = body.find('input[type="text"]');
		inputLength = body.find('input[type="number"]');
		inputSettings = body.find('input[type="checkbox"]');
		history = body.find('div.history');

		if (passwordsCache.length > 0) {
			passwordsCache.forEach(password => {
				history.append('<div class="item">' + password + '</div>');
			});
			history.attr('style', 'display:block');
		}

		body.find('button').click(function () {
			let chars = [];
			inputSettings.each(function () {
				if ($(this).is(':checked'))
					chars[chars.length] = $(this).val();
			});

			let password = generator.generate(inputLength.val(), chars);

			passwordsCache.unshift(password);
			sessionStorage.setItem('passwords', JSON.stringify(passwordsCache));

			history.show().prepend('<div class="item">' + password + '</div>');

			generator.animate(input[0], password);
		});

		input.click(function () { input.select(); });
	}

}

import generator from "./generator";
import Popup from "@ui/popup";

const defaultLength = 16;

let input;
let inputLength;
let inputSettings;
let history;

export default class Dialog extends Popup {
	constructor() {
		super({
			title: 'Генератор паролей',
			cls: 'password-generator'
		});
	}

	boot(el, body) {
		const sl = function (name, text) {
			const id = '_ps_s_' + name;
			return '<div class="item">'
				+ '<input id="' + id + '" type="checkbox" checked="checked" value="' + name + '" />'
				+ '<label for="' + id + '">' + text + '</label>'
				+ '</div>';
		};

		body
			.append('<div class="input-wrap">'
				+ '<input type="number" value="' + defaultLength + '" />'
				+ '<input type="text" readonly />'
				+ '<button type="button"></button>'
				+ '</div>'
				+ '<div class="settings-wrap">'
				+ sl('uppercase', 'A-Z')
				+ sl('lowercase', 'a-z')
				+ sl('numeric', '0-9')
				+ sl('symbols', '$#!')
				+ '</div>'
				+ '<div class="history"></div>');

		input = body.find('input[type="text"]');
		inputLength = body.find('input[type="number"]');
		inputSettings = body.find('input[type="checkbox"]');
		history = body.find('div.history');

		body.find('button').click(function () {
			let chars = [];
			inputSettings.each(function () {
				if ($(this).is(':checked'))
					chars[chars.length] = $(this).val();
			});

			const temp = input.val();

			history.show().prepend('<div class="item">' + temp + '</div>');

			let password = generator.generate(inputLength.val(), chars);

			generator.animate(input, password);
		});

		input.click(function () { input.select(); });
	}

	show() {
		super.show();

		if (input.val() === '')
			generator.set(input, generator.generate(defaultLength));
		else
			input.select();
	}
}

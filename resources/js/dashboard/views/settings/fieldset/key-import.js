import importKey from "../actions/key-import";

export default class KeyImport {
	constructor() {
		this.el = $('<fieldset>'
			+ '<legend>Ключ шифрования</legend>'
			+ '<div class="form-wrap">'
			+ '<div class="form-field">'
			+ '<label for="form-key">Ключ</label>'
			+ '<input type="text" id="form-key" autocomplete="new-password"/>'
			+ '<button type="submit" disabled>Изменить</button>'
			+ '</div>'
			+ '</div>'
			+ '</fieldset>');

		this.input = this.el.find('input')
			.bind('input', e => { this.btn.attr('disabled', !this.isValid()); });

		this.btn = this.el.find('button')
			.click(async e => {
				await importKey(this.input.val());
			});
	}

	get key() { return this.input.val(); }

	isValid() {
		const key = this.input.val();
		return key && key !== this.currentKey;
	}

	update(dataState) {
		this.currentKey = dataState.keyHash;

		this.input.val(dataState.keyHash);

		this.btn.attr('disabled', !this.isValid());

		const wrap = this.input.parent().parent();

		wrap.find('div.msg').remove();

		if (dataState.exists && !dataState.loaded)
			wrap.append('<div class="msg error">Не удалось получить данные синхронизации, некорректный ключ</div>');
	}
}

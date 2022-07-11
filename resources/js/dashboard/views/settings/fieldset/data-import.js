import importData from "../actions/data-import";

export default class DataImport {
	constructor() {
		this.el = $('<fieldset>'
			+ '<legend>Импортировать конфигурацию</legend>'
			+ '<div class="form-field">'
			+ '<label for="form-import-file">Файл</label>'
			+ '<input type="file" id="form-import-file"/>'
			+ '</div>'
			+ '<div class="form-field">'
			+ '<label for="form-import-key">Ключ</label>'
			+ '<input type="text" id="form-import-key" autocomplete="new-password"/>'
			+ '</div>'
			+ '<div class="button">'
			+ '<button type="submit" disabled>Загрузить</button>'
			+ '</div>'
			+ '</fieldset>');

		this.keyInput = this.el.find('input[type="text"]')
			.bind('input', e => { this.updateButtons(); });

		this.fileInput = this.el.find('input[type="file"]')
			.change(e => { this.updateButtons(); });

		this.btn = this.el.find('button')
			.click(async e => {
				await importData(this.file, this.key);

				this.fileInput.val('');
			});
	}

	get key() { return this.keyInput.val(); }

	get file() { return this.fileInput[0].files[0]; }

	hasFile() { return !!this.file; }

	isValid() { return this.hasFile() && this.keyInput.val() !== ''; }

	updateButtons() {
		this.btn.attr('disabled', !this.isValid());
	}

	update(dataState) {
		this.keyInput.val(dataState.keyHash);
		this.updateButtons();
	}
}

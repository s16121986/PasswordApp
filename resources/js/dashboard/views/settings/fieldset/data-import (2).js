import importData from "../actions/data-import";

export default class DataImport {
	constructor() {
		this.keyInput = $('#form-import-key')
			.val(app('currentKey'))
			.bind('input', e => { this.update(); });

		this.fileInput = $('#form-import-file')
			.change(e => { this.update(); });

		this.btn = $('#btn-import')
			.click(e => { importData(this.file, this.key); });
	}

	get key() { return this.keyInput.val(); }

	get file() { return this.fileInput[0].files[0]; }

	hasFile() { return !!this.file; }

	isValid() { return this.hasFile() && this.keyInput.val() !== ''; }

	update() {
		this.btn.attr('disabled', !this.isValid());
	}
}

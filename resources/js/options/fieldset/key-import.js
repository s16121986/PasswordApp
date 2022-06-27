import importKey from "../actions/key-import";

export default class KeyImport {
	constructor() {
		this.input = $('#form-key')
			.val(app('currentKey'))
			.bind('input', e => {
				const key = this.input.val();
				const isValid = key && key !== app('currentKey');
				this.btn.attr('disabled', !isValid);
			});

		this.btn = $('#btn-key').click(async e => {
			setLoading(true);

			await importKey(this.input.val());

			setLoading(false);
		});
	}

	get key() { return this.input.val(); }
}

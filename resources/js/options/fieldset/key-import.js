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

		(async () => {
			const wrap = this.input.parent().parent();

			wrap.addClass('loading');

			const dataState = app('dataState');
			if (dataState.exists && !dataState.loaded)
				wrap.append('<div class="msg error">Не удалось получить данные синхронизации, некорректный ключ</div>');

			wrap.removeClass('loading');
		})();
	}

	get key() { return this.input.val(); }
}

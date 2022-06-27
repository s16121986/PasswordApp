import clearData from "../actions/data-clear";

export default class DataClear {
	constructor() {
		this.btn = $('#btn-clear')
			.click(async e => {
				if (confirm('Конфигурация будет безвозвратно удалена! Продолжить?'))
					clearData();
			});

		if (app('dataState').exists)
			this.btn.removeAttr('disabled');
	}
}


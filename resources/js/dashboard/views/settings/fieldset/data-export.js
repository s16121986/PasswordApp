import exportData from "../actions/data-export";

export default class DataExport {
	constructor() {
		this.el = $('<fieldset>'
			+ '<legend>Экспортировать конфигурацию</legend>'
			+ '<div class="button">'
			+ '<button type="submit" disabled>Скачать</button>'
			+ '</div>'
			+ '</fieldset>');

		this.btn = this.el.find('button')
			.click(async e => { exportData(); });
	}

	update(dataState) {
		if (dataState.exists)
			this.btn.removeAttr('disabled');
		else
			this.btn.attr('disabled', true);
	}
}


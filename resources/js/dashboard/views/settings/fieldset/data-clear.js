import clearData from "../actions/data-clear";
import Confirm from "../../../ui/confirm";

export default class DataClear {
	constructor() {
		this.el = $('<fieldset>'
			+ '<legend>Удалить конфигурацию</legend>'
			+ '<div class="button">'
			+ '<button type="submit" disabled>Удалить</button>'
			+ '</div>'
			+ '</fieldset>');

		this.btn = this.el.find('button')
			.click(async e => {
				Confirm('Конфигурация будет безвозвратно удалена! Продолжить?', clearData);
			});
	}

	update(dataState) {
		if (dataState.exists)
			this.btn.removeAttr('disabled');
		else
			this.btn.attr('disabled', true);
	}
}


import clearData from "../actions/data-clear";

export default class DataClear {
	constructor() {
		this.btn = $('#btn-clear')
			.click(async e => {
				setLoading(true);

				await clearData();

				setLoading(false);
			});

		if (!app('data').isEmpty())
			this.btn.removeAttr('disabled');
	}
}


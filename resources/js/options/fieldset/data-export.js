import exportData from "../actions/data-export";

export default class DataExport {
	constructor() {
		this.btn = $('#btn-export')
			.click(async e => {
				setLoading(true);

				await exportData();

				setLoading(false);
			});

		if (!app('data').isEmpty())
			this.btn.removeAttr('disabled');
	}
}


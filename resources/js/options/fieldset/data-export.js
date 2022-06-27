import exportData from "../actions/data-export";

export default class DataExport {
	constructor() {
		this.btn = $('#btn-export')
			.click(async e => { exportData(); });

		if (app('dataState').exists)
			this.btn.removeAttr('disabled');
	}
}


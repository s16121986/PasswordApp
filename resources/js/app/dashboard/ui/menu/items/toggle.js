import Item from "../item";

export default class ToggleItem extends Item {
	constructor(params) {
		super(params);

		if (params.checked)
			this.setChecked(true);

		if (!params.handler) {
			this.change = params.change || (() => {});
			this.el.click(e => {
				if (this.isDisabled())
					return;

				const flag = this.isChecked();
				this.setChecked(!flag);
				this.change(this, !flag);
			});
		}
	}

	isChecked() { return this.el.hasClass('checked'); }

	setChecked(flag) { this.el[flag ? 'addClass' : 'removeClass']('checked'); }
}

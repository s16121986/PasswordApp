import Item from "../item";
import ToggleItem from "./toggle";
import MenuItem from "./menu";

export default {
	factory: function (params) {
		if (params instanceof Item)
			return params;

		if (params.type && this[params.type])
			return this[params.type](params);
		else if (params.items)
			return this.menu(params);

		return this.item(params);
	},

	item: params => new Item(params),
	toggle: params => new ToggleItem(params),
	menu: params => new MenuItem(params)
};

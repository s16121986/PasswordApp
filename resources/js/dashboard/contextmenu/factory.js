export default {
	site: menu => {
		menu
			.favorite()
			.archive()
			.tags()
			.hr()
			.password()
			.edit()
			//.colors()
			.hr()
			.delete();
	},

	email: menu => {
		menu
			.favorite()
			.archive()
			.tags()
			.hr()
			.edit()
			.hr()
			.delete();
	},

	note: menu => {
		menu
			.favorite()
			.archive()
			.tags()
			.hr()
			.edit()
			//.colors()
			.hr()
			.delete();
	},

	ssh: menu => {
		menu
			.favorite()
			.archive()
			.tags()
			.hr()
			.password()
			.edit()
			//.colors()
			.hr()
			.delete();
	},

	password: menu => {
		menu
			.edit()
			.hr()
			.delete();
	}
};

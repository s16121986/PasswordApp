import Form from "@ui/form/form";

export default function DataImportDialog() {
	//const keyExists = app('cryptKey').exists();
	const form = new Form({
		title: 'Импортировать файл',
		//data: model.data,
		submit: async (data, form) => {
			form.setLoading(true);

			if (data.key) {
				await app('encoder').importKey(data.key);
			}

			if (app('encoder').hasKey()) {
				await app('cryptKey').store();

				app('dashboard').setLoading(true);

				form.hide();

				await app('data').load();
				//await app('data').store();

				app('dashboard').setLoading(false);
			} else {

				form.setLoading(false);
			}
		}
	});

	form.file('file', {label: 'Файл'});
	form.password('key', {label: 'Ключ'});

	form.show();
}

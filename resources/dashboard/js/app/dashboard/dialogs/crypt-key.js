import Form from "@ui/form/form";

export default function CryptKeyDialog() {
	//const keyExists = app('cryptKey').exists();
	const form = new Form({
		title: 'Ключ шифрования',
		//data: model.data,
		submit: async (data, form) => {
			form.setLoading(true);

			await app('encoder').importKey(data.key);

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

	form.password('key', {label: 'Ключ'});

	form.show();
}

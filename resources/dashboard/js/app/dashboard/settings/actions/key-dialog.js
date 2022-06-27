import Form from "@ui/form/form";

export default function () {
	//const keyExists = app('cryptKey').exists();
	const form = new Form({
		title: 'Ключ шифрования',
		//data: model.data,
		submit: async (data, form) => {
			form.setLoading(true);

			await app('encoder').importKey(data.key);

			if (app('encoder').hasKey()) {
				await app('cryptKey').store();

				//await app('data').store();

				form.hide();
			} else {

				form.setLoading(false);
			}
		}
	});

	form.password('key', {label: 'Ключ'});

	form.show();
}
() => {
	//показать
	//сгенерировать
	//изменить
}

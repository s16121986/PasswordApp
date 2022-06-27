import Form from "@ui/form/form";

export default function CryptKeyDialog() {
	//const keyExists = app('encryptKey').exists();
	const form = new Form({
		title: 'Ключ шифрования',
		cls: 'form-crypt-key',
		//data: model.data,
		submit: async (data, form) => {
			if (!data.key)
				return;

			form.setLoading(true);

			copy(data.key);

			await app('encoder').importKey(data.key);

			if (app('encoder').hasKey()) {
				await app('encryptKey').store();

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

	form.password('key', {label: 'Ключ', cls: 'key'});

	const btn = $('<button type="button" class="generate"></button>');
	btn.click(async () => {
		const key = await app('encoder').generateKey();
		const element = form.getElement('key');
		element.value = key;
		element.select();
	});
	form.getElement('key').el.append(btn);

	form.show();
}

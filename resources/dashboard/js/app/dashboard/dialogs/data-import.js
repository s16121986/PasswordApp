import Form from "@ui/form/form";

function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => { resolve(reader.result); };
		reader.readAsText(file);
	});
}

export default function DataImportDialog() {
	const form = new Form({
		title: 'Импортировать файл',
		submit: async (formData, form) => {
			const files = form.getElement('file').input[0].files;
			if (files.length === 0)
				throw 'File required';

			form.setLoading(true);

			if (formData.key) {
				await app('encoder').importKey(formData.key);
				await app('encryptKey').store();
			}

			if (!app('encoder').hasKey())
				throw 'Encrypt key required';

			const encodedData = await readFile(files[0]);
			if (!encodedData)
				throw 'File content empty';

			let data;
			try {
				const decrypted = await app('encoder').decrypt(encodedData);
				data = JSON.parse(decrypted);
			} catch (e) {
				throw e;
			}

			app('data').setData(data);

			await app('data').store();

			form.hide();
		}
	});

	form
		.file('file', {label: 'Файл'})
		.password('key', {label: 'Ключ'})
		.show();
}

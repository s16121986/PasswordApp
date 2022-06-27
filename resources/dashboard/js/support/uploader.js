let input;

function destroy() {
	if (!input)
		return;

	input.remove();
	input = undefined;
}

export default {
	upload: () => {
		return new Promise((resolve, reject) => {
			destroy();

			input = $('<input type="file" hidden/>')
				.change(function () {
					if (this.files.length === 0) {
						reject(null);
						return destroy();
					}

					const reader = new FileReader();
					reader.onload = () => { resolve(reader.result); };
					reader.readAsText(this.files[0]);

					destroy();
				})
				.appendTo(document.body);

			input.click();
		});
	}
};

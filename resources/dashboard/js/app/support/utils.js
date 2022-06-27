function copy(text, successText) {
	if (navigator.clipboard) {
		app('progressbar').show({
			cls: 'copy',
			text: 'Копирование',
			loading: true
		});

		navigator.clipboard.writeText(text)
			.then(() => {
				app('progressbar').show({
					cls: 'copied',
					text: successText || 'Скопировано',
					timeout: 2000
				});
			})
			.catch(err => {
				app('progressbar').error({
					timeout: 2000
				});
				console.error(err);
			});
	} else {
		//el.html(text);
	}
}

export default {
	copy: copy
}

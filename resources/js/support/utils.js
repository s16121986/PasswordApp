const copy = (() => {
	if (navigator.clipboard)
		return (text, successText) => {
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
		};
	else
		return (text, successText) => {
			const copyFrom = document.createElement("textarea");
			copyFrom.style.visibility = 'hidden';
			copyFrom.textContent = text;
			document.body.appendChild(copyFrom);
			copyFrom.select();
			document.execCommand('copy');
			copyFrom.blur();
			document.body.removeChild(copyFrom);
		};
})();

export default {
	copy: copy
}

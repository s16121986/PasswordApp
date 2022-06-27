function copy(text, successText) {
	if (navigator.clipboard) {
		const stateEl = $('<div class="app-state copied loading">Копирование</div>').appendTo(document.body);

		navigator.clipboard.writeText(text)
			.then(() => {
				stateEl
					.removeClass('loading')
					.addClass('success')
					.html(successText || 'Скопировано');
				window.setTimeout(function () { stateEl.fadeOut(); }, 1000);
			})
			.catch(err => {
				stateEl
					.removeClass('loading')
					.addClass('error');
				window.setTimeout(function () { stateEl.fadeOut(); }, 1000);
				console.log(err);
			});
	} else {
		//el.html(text);
	}
}

export default {
	copy: copy
}

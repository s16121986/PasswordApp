export default function Confirm(text, submit) {
	const wrap = $('<div class="shadow"></div>')
		.appendTo(document.body)
	const el = $('<div class="ui-confirmation">'
		+ '<div class="text">' + text + '</div>'
		+ '<div class="buttons">'
		+ '<button class="btn-submit">Да</button>'
		+ '<button class="btn-cancel">Отмена</button>'
		+ '</div>'
		+ '</div>')
		.appendTo(wrap);
	const cancel = () => { wrap.remove(); };

	el.find('button.btn-submit').click(e => {
		submit();
		cancel();
	});
	el.find('button.btn-cancel').click(e => { cancel(); });
}

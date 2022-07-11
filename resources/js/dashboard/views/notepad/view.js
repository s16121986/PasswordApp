import Base from "../view"

let timeout;

/*function stripTags(text) {
	return text
		.replace(/<br>/gi, '\n')
		.replace(/<div>/gi, '\n')
		.replace(/<\/div>/gi, '');
}*/

export default class View extends Base {
	#changed = false;

	constructor() {
		super('notepad');
	}

	get contentEl() { return this.el[0].childNodes[1]; }

	boot(el) {
		el.append('<h1>Блокнот <div class="btn-clear">Очистить</div></h1>');

		el.find('div.btn-clear').click(e => {
			this.contentEl.innerHTML = '';
			this.store();
		});

		const wrap = $('<div class="notepad-content" style="white-space: pre-wrap"></div>')
			.appendTo(el)
			.html(app('data').get('notepad'))
			.prop('spellcheck', false)
			.prop('contenteditable', true)
			.bind('paste', e => {
				e.preventDefault();

				const text = (e.originalEvent || e).clipboardData.getData('text/plain');

				document.execCommand("insertHTML", false, text);
			})
			.bind('input', e => {
				if (timeout)
					clearTimeout(timeout);

				this.#changed = true;

				timeout = setTimeout(() => {
					this.store();
					timeout = undefined;
				}, 400);
				//this.#timeout.start(true);
			});
	}

	async store() {
		const text = this.contentEl.innerHTML;
		//text = stripTags(text);
		app('data').set('notepad', text);
		await app('data').store();
		this.#changed = false;
	}

}

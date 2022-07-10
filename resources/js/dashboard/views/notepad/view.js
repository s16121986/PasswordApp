import Base from "../view"

let timeout;

export default class View extends Base {
	#changed = false;

	constructor() {
		super('notepad');
	}

	boot(el) {
		el
			.html(app('data').get('notepad'))
			.prop('spellcheck', false)
			.prop('contenteditable', true)
			.bind('input', (e) => {
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
		const text = this.el[0].innerHTML;
		app('data').set('notepad', text);
		await app('data').store();
		this.#changed = false;
	}

}

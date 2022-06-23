import BaseView from "../default/view";
import selection from "../../support/selection";
import Timeout from "../../support/timeout";

export default class View extends BaseView {
	#timeout;
	#ctrlDown;
	#ctrlUp;
	#changed = false;

	constructor(note) {
		super(note, {
			title: note.name
		});
	}

	bootMenu(menu) {
		menu
			.edit()
			//.colors()
			.hr()
			.delete();
	}

	render() {
		super.render();

		const el = this.content;
		let text = this.model.get('text');

		this.#timeout = new Timeout(500);
		this.#timeout.bind(() => {
			if (!this.#changed)
				return;

			this.#timeout.stop();
			this.#changed = false;
			$.post('/note/' + this.model.id + '/edit', {text: text}, () => {

			});
			//self.save({text: text});
		});

		this.#ctrlDown = (e) => {
			if (this.#ctrlUp || !e.ctrlKey)
				return;

			el.prop('contenteditable', false);
			el.html(text.replace(/http(|s):\/\/.*/g, '<a href="$&" target="_blank">$&</a>'));

			this.#ctrlUp = (e) => {
				if (e.ctrlKey)
					return;

				el.unbind('keyup', this.#ctrlUp);
				this.#ctrlUp = null;

				el.prop('contenteditable', true)
					.html(text);
			};

			$(document).bind('keyup', this.#ctrlUp);
		}

		//$(document).keydown(this.#ctrlDown);

		el
			.addClass('note-content')
			.prop('spellcheck', false)
			.prop('contenteditable', true)
			.click((e) => {
				if (e.ctrlKey)
					selection.expand('word');
			})
			.bind('input', (e) => {
				this.#changed = true;

				text = el[0].innerHTML;

				this.#timeout.start(true);
			})
			.append(text);
	}

	destroy() {
		$(document).unbind('keydown', this.#ctrlDown);
		this.#ctrlDown = null;

		if (this.#ctrlUp) {
			$(document).unbind('keyup', this.#ctrlUp);
			this.#ctrlUp = null;
		}

		super.destroy();
	}
}



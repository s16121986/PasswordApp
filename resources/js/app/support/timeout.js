export default class Timeout {
	#t;
	#timeout;
	#callbacks = [];

	constructor(timeout) {
		this.#timeout = timeout;
	}

	start(restart) {
		const handler = () => {
			for (let i = 0, l = this.#callbacks.length; i < l; i++)
				this.#callbacks[i][0].call(this, this.#callbacks[i][1]);
			this.#t = undefined;
		}

		if (restart) {
			this.stop();
			this.#t = window.setTimeout(handler, this.#timeout);
		} else if (!this.isStarted()) {
			this.#t = window.setTimeout(handler, this.#timeout);
		}
	}

	stop() {
		if (this.isStarted()) {
			window.clearTimeout(this.#t);
			this.#t = undefined;
		}
	}

	isStarted() { return this.#t !== undefined; }

	bind(fn, params) {
		this.#callbacks[this.#callbacks.length] = [fn, params];
		return this;
	}
};

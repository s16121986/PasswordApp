import EventsTrait from "@core/events"

export default class Model {
	#data;

	constructor(data, type) {
		/*delete data.created_at;
		delete data.updated_at;
		delete data.color;
		delete data.folder_id;
		delete data.id;
		delete data.index;
		delete data.note;
		delete data.project_id;
		delete data.entity_id;
		delete data.entity;*/

		this.#data = data || {};
		this.model = type;
	}

	get data() { return this.#data; }

	get(name) { return this.#data[name]; };

	set(name, value) {
		if (this.#data[name] === value)
			return;

		this.#data[name] = value;
		this.trigger(name + '-change', value);
		this.trigger('change');
	}

	hasTerm(term) { return false; }

	update(data) {
		for (let i in data) {
			this.set(i, data[i]);
		}
	}

	store() { app('data').store(); }

	reset() {
		this.#data = undefined;
	}

	destroy() {
		this.trigger('destroy');
		this.reset();
		this.unbind();
	}

	serialize() { return this.#data; }

}

Object.assign(Model.prototype, EventsTrait);

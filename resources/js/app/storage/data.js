import EventsTrait from "@core/events"
import Collection from "@support/collection";
import Site from "../model/site";
import Email from "../model/email";
import Ssh from "../model/ssh";
import Note from "../model/note";
import Sync from "./sync";

let collections;
let dataObject = {};

const modelAssoc = {
	site: 'sites',
	ssh: 'ssh',
	email: 'emails',
	note: 'notes'
};

function parseData(data) {
	try {
		return JSON.parse(data);
	} catch (e) {
		console.error(data);
	}

	return null;
}

async function loadData() {
	const data = await app('data').sync.get();
	if (data) {
		//console.log('Sync data: ', data);
		sessionStorage.setItem('data', data);

		return parseData(data);
	} else
		sessionStorage.setItem('data', '{}');
}

async function retrieveData() {
	let data = sessionStorage.getItem('data');
	//data = decodeURIComponent(escape(atob(data)));
	//sessionStorage.setItem('data', data);
	if (data)
		return parseData(data);

	//data = localStorage.getItem('data');
	return await loadData();
}

function clearData() {
	for (let i in collections) {
		collections[i].clear();
	}
	dataObject.notepad = '';
}

export default class Data {
	constructor() {
		collections = {
			sites: new Collection(),
			emails: new Collection(),
			ssh: new Collection(),
			notes: new Collection(),
			//documents: new Collection(),
			//tags: new Collection(),
		};
		dataObject.notepad = '';
		//this.#tags = new Collection();
		//this.#cards = new Collection();

		this.sync = new Sync();
	}

	get collections() { return collections; }

	getModelCollection(model) { return collections[modelAssoc[model.model]]; }

	get(name) { return collections[name] || dataObject[name]; }

	set(name, value) { dataObject[name] = value; }

	remove(item) {
		for (let i in collections) {
			collections[i].remove(item);
		}
	}

	setData(data) {
		clearData();

		if (!data) {
			this.trigger('update');

			return;
		}

		const factories = {
			sites: Site,
			emails: Email,
			ssh: Ssh,
			notes: Note,
		};

		for (let i in factories) {
			const c = collections[i];
			(data[i] || []).forEach(r => c.add(new factories[i](r)));
		}

		dataObject.notepad = data.notepad || '';

		this.trigger('update');
	}

	cache() {
		sessionStorage.setItem('data', this.toString());
	}

	async store() {
		this.cache();

		if (this.isEmpty())
			await this.sync.clear();
		else
			await this.sync.set(this.toString());

		this.trigger('store');
	}

	async load() {
		const data = await loadData();

		this.setData(data);

		//this.trigger('load');
	}

	async retrieve() {
		const data = await retrieveData();

		this.setData(data);

		//this.trigger('retrieve');
	}

	isEmpty() {
		for (let i in collections) {
			if (!collections[i].isEmpty())
				return false;
		}

		if (dataObject.notepad)
			return false;

		return true;
	}

	clear() {
		clearData();

		this.trigger('update');
	}

	serialize() {
		const data = {};
		for (let i in collections) {
			data[i] = collections[i].serialize();
		}
		return Object.assign(data, dataObject);
	}

	toString() { return JSON.stringify(this.serialize()); }
}

Object.assign(Data.prototype, EventsTrait);

import EventsTrait from "@core/events"
import Collection from "../support/collection";
import Site from "../model/site";
import Email from "../model/email";
import Ssh from "../model/ssh";
import Note from "../model/note";
import Sync from "./sync";

let collections;

const modelAssoc = {
	site: 'sites',
	ssh: 'ssh',
	email: 'emails',
	note: 'notes',
};

function parseData(data) {
	try {
		return JSON.parse(data);
	} catch (e) {
		console.error(data);
	}

	return null;
}

async function retrieveData() {
	let data = sessionStorage.getItem('data');
	if (data)
		return parseData(data);

	data = await app('data').sync.get('data');
	//console.log(data);
	if (!data)
		return;

	//console.log('Sync data: ', data);
	sessionStorage.setItem('data', data);

	return parseData(data);
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
		//this.#tags = new Collection();
		//this.#cards = new Collection();

		this.sync = new Sync();
	}

	get collections() { return collections; }

	get(name) { return collections[name]; }

	setData(data) {
		this.clear();

		if (!data)
			return;

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
	}

	getModelCollection(model) { return collections[modelAssoc[model.model]]; }

	remove(item) {
		for (let i in collections) {
			collections[i].remove(item);
		}
	}

	clear() {
		for (let i in collections) {
			collections[i].clear();
		}
	}

	async store() {
		const data = this.serialize();

		data.updated_at = (new Date()).getTime();

		const content = JSON.stringify(data);

		sessionStorage.setItem('data', content);

		await this.sync.set('data', content);

		this.trigger('store');
	}

	async load() {
		const data = await retrieveData();

		this.setData(data);
		/*for (let i in factories) {
			const c = collections[i];
			const data = localStorage.getItem(i);
			if (!data)
				continue;
			JSON.parse(data).forEach(r => c.add(new factories[i](r)));
		}*/

		this.trigger('load');
	}

	serialize() {
		const data = {};
		for (let i in collections) {
			data[i] = collections[i].serialize();
		}
		return data;
	}
}

Object.assign(Data.prototype, EventsTrait);

import Collection from "./support/collection";
import Project from "./model/project";
import EventTraits from "../core/events"
import Folder from "./model/folder";
import Note from "./model/note";
import Ssh from "./model/ssh";
import Email from "./model/email";
import Site from "./model/site";
import Doc from "./model/document";

function findEntity(projects, name, id) {
	for (let i = 0; i < projects.count(); i++) {
		const entity = projects.eq(i)[name].find(f => f.id === id);
		if (entity)
			return entity;
	}

	return null;
}

export default class Application {
	static #instance;

	static getInstance() { return this.#instance || (this.#instance = new Application()); }

	#projects;
	#folders;
	#emails;
	#ssh;
	#sites;
	#notes;
	#documents;
	//#cards;
	//#tags;
	#ready = false;

	constructor() {
		this.#projects = new Collection();
		this.#folders = new Collection();
		this.#sites = new Collection();
		this.#emails = new Collection();
		this.#ssh = new Collection();
		this.#notes = new Collection();
		this.#documents = new Collection();
		//this.#tags = new Collection();
		//this.#cards = new Collection();
	}

	get projects() { return this.#projects; }

	get folders() { return this.#folders; }

	get sites() { return this.#sites; }

	get emails() { return this.#emails; }

	get ssh() { return this.#ssh; }

	get notes() { return this.#notes; }

	get documents() { return this.#documents; }

	update() {
		const set = (r) => {
			r.projects.forEach(d => { this.#projects.add(new Project(d)); });
			r.folders.forEach(d => { this.#folders.add(new Folder(d)); });
			r.sites.forEach(d => { this.#sites.add(new Site(d)); });
			r.emails.forEach(d => { this.#emails.add(new Email(d)); });
			r.ssh.forEach(d => { this.#ssh.add(new Ssh(d)); });
			r.notes.forEach(d => { this.#notes.add(new Note(d)); });
			//r.documents.forEach(d => { this.#documents.add(new Doc(d)); });

			if (this.#ready)
				this.trigger('update');
			else {
				this.#ready = true;
				this.trigger('ready');
			}
		};

		$.getJSON('/data', (r) => {
			localStorage.setItem('data', btoa(unescape(encodeURIComponent(JSON.stringify(r)))));

			set(r);
		}, function () {
			const cache = localStorage.getItem('data');
			if (!cache)
				return;

			const data = JSON.parse(decodeURIComponent(escape(atob(cache))));
			//console.log(data)
			set(data);
		});


	}

	ready(fn) { return this.bind('ready', fn); }

	//tags() { return this.#tags; }

	toString() { return 'Список проектов'; }
}

Object.assign(Application.prototype, EventTraits);

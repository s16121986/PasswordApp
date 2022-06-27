import Model from "./model";

export default class Entity extends Model {
	constructor(data, type) {
		super(data, type);
	}

	get name() { return this.get('name'); }

	get tags() { return this.get('tags') || []; }

	get isFavorite() { return !!this.get('favorite'); }

	get isArchive() { return !!this.get('archive'); }

	setFavorite(flag) { return this.set('favorite', flag); }

	setArchive(flag) { return this.set('archive', flag); }

	hasTag(tag) { return this.tags.includes(tag); }

	addTag(tag) {
		if (this.hasTag(tag))
			return;

		let tags = this.tags;
		tags.push(tag);
		this.set('tags', tags);
	}

	removeTag(tag) {
		let tags = this.tags;
		const i = tags.findIndex(t => t === tag);
		if (i === -1)
			return;

		tags.splice(i, 1);
		this.set('tags', tags);
	}

	toString() { return this.name; }
}

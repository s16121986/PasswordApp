import handlers from "./actions";
import BaseMenu from "@ui/menu/menu";

const colors = {
	yellow: 'Желтый',
	green: 'Зеленый',
	blue: 'Синий',
	red: 'Красный'
};

export default class Menu extends BaseMenu {
	#item;

	constructor(item) {
		super();
		this.#item = item;

		this.el.appendTo(document.body);
	}

	get item() { return this.#item; }

	get model() { return this.#item.model; }

	favorite() {
		return this.defaultItem({
			data: {model: this.model},
			handler: handlers.favorite,
			text: this.model.isFavorite ? 'Из избранного' : 'В избранное',
			cls: 'favorite'
		});
	}

	archive() {
		return this.defaultItem({
			data: {model: this.model},
			handler: handlers.archive,
			text: this.model.isArchive ? 'Из архива' : 'В архив',
			cls: 'archive'
		});
	}

	tags() {
		return this.defaultItem({
			data: {model: this.model},
			text: 'Теги',
			cls: 'tags',
			handler: handlers.tags
		});
	}

	password() {
		return this.defaultItem({
			data: {item: this.item},
			text: 'Добавить пароль',
			cls: 'password',
			handler: handlers.addPassword
		});
	}

	edit() {
		return this.defaultItem({
			data: {model: this.model},
			text: 'Изменить',
			cls: 'edit',
			handler: handlers.edit
		});
	}

	delete() {
		return this.defaultItem({
			data: {item: this.item},
			text: 'Удалить',
			cls: 'delete',
			handler: handlers.delete
		});
	}

	colors() {
		return this.menuItem({
			text: 'Цвет',
			cls: 'colors',
			items: []
		});
	}

	hide() { this.destroy(); }

	destroy() {
		super.destroy();
		this.#item = undefined;
	}
}

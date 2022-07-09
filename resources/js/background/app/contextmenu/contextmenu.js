const handlers = {
	findPassword: (clickData, tab) => {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			files: ['content.js']
		});
	},
	generatePassword: () => {

	}
};

export default class Contextmenu {
	constructor() {}

	boot() {
		chrome.contextMenus.create({
			id: "main",
			title: "Менеджер паролей",
			contexts: ['all']
		});

		chrome.contextMenus.create({
			id: "findPassword",
			parentId: "main",
			title: "Найти пароль",
			contexts: ['editable']
		});

		chrome.contextMenus.create({
			id: "create-item",
			parentId: "main",
			title: "Добавить элемент",
			contexts: ['selection']
		});

		chrome.contextMenus.create({
			id: "sep-1",
			parentId: "main",
			type: "separator",
			contexts: ['editable', 'selection']
		});

		chrome.contextMenus.create({
			id: "create-site",
			parentId: "main",
			title: "Добавить в сайты",
			contexts: ['all']
		});

		chrome.contextMenus.create({
			id: "generatePassword",
			parentId: "main",
			title: "Сгенерировать пароль",
			contexts: ['editable']
		});

		chrome.contextMenus.onClicked.addListener((clickData, tab) => {
			if (undefined === handlers[clickData.menuItemId])
				return;

			handlers[clickData.menuItemId](clickData, tab);
		});
	}
}

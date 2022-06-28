export default class Contextmenu {
	constructor() {}

	boot() {
		chrome.contextMenus.create({
			id: "main",
			title: "Менеджер паролей",
			contexts: ['all']
		});

		/*chrome.contextMenus.create({
			id: "find",
			parentId: "main",
			title: "Найти пароль",
			contexts: ['editable']
		});

		chrome.contextMenus.create({
			id: "sep-1",
			parentId: "main",
			type: "separator",
			contexts: ['editable', 'page']
		});

		chrome.contextMenus.create({
			id: "create-site",
			parentId: "main",
			title: "Сохранить в сайты",
			contexts: ['all']
		});*/

		chrome.contextMenus.onClicked.addListener((clickData, tab) => {
			if (clickData.menuItemId !== "main")
				return;

			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				files: ['content.js']
			});
		})
	}
}

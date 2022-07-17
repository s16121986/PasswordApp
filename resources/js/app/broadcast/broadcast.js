export default class Broadcast {
	constructor() {
		this.extensionId = chrome.runtime.id;
	}

	async send(action, data) {
		if (!chrome.runtime.id)
			return;

		const response = await chrome.runtime.sendMessage(this.extensionId, {type: action, data: data});

		if (response.error) {
			this.lastError = response.exception;
			//console.error(response);
			return null;
		}

		return response.data;
	}
}

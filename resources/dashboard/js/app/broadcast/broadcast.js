export default class Broadcast {
	constructor() {
		this.extensionId = chrome.runtime.id;
	}

	async send(action, data) {
		const response = await chrome.runtime.sendMessage(this.extensionId, {type: action, data: data});

		if (response.error) {
			this.lastError = response.exception;
			return null;
		}

		return response.data;
	}
}

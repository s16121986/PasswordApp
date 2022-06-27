import Application from "./app/app"

(async function (global) {
	const _app = new Application();

	_app.boot();

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (sender.id !== _app.extensionId)
			return;

		const router = app('router');
		if (!router.hasRoute(request.type))
			return;

		_app.ready(async () => {
			const response = await router.execute(request.type);

			sendResponse(response);
		});

		return true;
	});

})(self);

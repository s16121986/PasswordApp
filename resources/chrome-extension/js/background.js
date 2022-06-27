import Application from "./app/app"

(async function (global) {
	const _app = new Application();

	_app.boot();

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (sender.id !== _app.extensionId)
			return;

		const router = app('router');
		if (!router.hasRoute(request.type)) {
			console.error('Router action [' + request.type + '] undefined');
			return;
		}

		(async () => {
			const response = await router.execute(request.type, request.data);

			sendResponse(response);
		})();

		return true;
	});

})(self);

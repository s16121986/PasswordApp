import Application from "./app";
import Dashboard from "./dashboard";
import Router from "./router";

function copy(text, success) {
	if (navigator.clipboard) {
		const stateEl = $('<div class="app-state copied loading">Копирование</div>').appendTo(document.body);

		navigator.clipboard.writeText(text)
			.then(() => {
				stateEl
					.removeClass('loading')
					.addClass('success')
					.html(success || 'Скопировано');
				window.setTimeout(function () { stateEl.fadeOut(400, () => { stateEl.remove(); }); }, 1000);
			})
			.catch(err => {
				stateEl
					.removeClass('loading')
					.addClass('error');
				window.setTimeout(function () { stateEl.fadeOut(400, () => { stateEl.remove(); }); }, 1000);
				console.log(err);
			});
	} else {
		//el.html(text);
	}
}

Object.assign(window, {
	app: () => Application.getInstance(),

	dashboard: () => Dashboard.getInstance(),

	route: (name, args) => { Router.getInstance().route(name, args); },

	abort: (code) => { route('home'); },

	back: () => { history.back(); },

	copy: copy,

	/*project(id) { return app().projects.find(p => p.id === id); },

	folder(id) { app().folders.find(p => p.id === id); },

	site(id) { app().sites.find(p => p.id === id); },

	email(id) { app().emails.find(p => p.id === id); },

	ssh(id) { app().ssh.find(p => p.id === id); },

	note(id) { app().notes.find(p => p.id === id); }*/
});

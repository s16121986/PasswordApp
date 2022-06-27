function setLoading(flag) { $(document.body)[flag ? 'addClass' : 'removeClass']('loading'); }

function error(e) { alert(e); }

Object.assign(window, {
	setLoading: setLoading,
	reload: () => { location.reload(); },
	error: error
});

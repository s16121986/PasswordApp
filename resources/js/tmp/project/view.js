import "../main"

import Site from "../../app/project/item/site"
import Ssh from "../../app/project/item/ssh"
import Email from "../../app/project/item/email"
import Note from "../../app/project/item/note"
import Items from "../../app/project/items"

$(document).ready(function () {
	const container = $('#project-view');
	let expanded;

	function expand(e, item) {
		e.stopPropagation();

		if (expanded && expanded[0] !== item[0])
			expanded.removeClass('expanded');

		if (item.hasClass('expanded')) {
			item.removeClass('expanded');
			expanded = null;
		} else {
			item.addClass('expanded');
			expanded = item;
		}
	}

	$(document).click(function (e) {
		if (!expanded || expanded.is(e.target) || expanded.find(e.target).length)
			return;

		expanded.removeClass('expanded');
		expanded = null;
	});

	const sites = new Items(container.find('div.data-sites'), Site);
	const emails = new Items(container.find('div.data-emails'), Email);
	const ssh = new Items(container.find('div.data-ssh'), Ssh);
	const notes = new Items(container.find('div.data-notes'), Note);
});

const findPos = function (text, pos, chars) {
	let offset = {start: 0, end: text.length};
	const s = text.substring(0, pos);

	for (let p, i = 0; i < chars.length; i++) {
		p = s.lastIndexOf(chars[i]);
		if (p === -1)
			continue;
		if (p + 1 > offset.start)
			offset.start = p + 1;
	}

	for (let p, i = 0; i < chars.length; i++) {
		p = text.indexOf(chars[i], pos);
		if (p === -1)
			continue;
		if (offset.end > p)
			offset.end = p;
	}

	return offset;
};

export default new function () {
	this.focus = function (el) {
		el.focus();
	};
	this.select = function (range) {
		if (!range)
			return;
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	};

	this.element = function (el) {
		const range = document.createRange();
		range.selectNodeContents(el);
		this.select(range);
	};

	this.expand = function (type) {
		const sel = window.getSelection();
		if (sel.type !== 'Caret')
			return;

		const el = sel.focusNode;
		if (!el || el.nodeName !== '#text')
			return;

		const text = el.textContent;
		const pos = sel.focusOffset
		let start, end;
		//console.log(sel)
		let offset;

		switch (type) {
			case 'line':
				offset = findPos(text, pos, ['\n']);
				break;
			case 'element':
			default: //word
				offset = findPos(text, pos, [' ', '\n']);
		}

		const range = document.createRange();
		const rangeTmp = document.createRange();
		rangeTmp.setStart(el, offset.start);
		rangeTmp.setEnd(el, offset.end);
		this.select(rangeTmp);

		return range;
	};
};

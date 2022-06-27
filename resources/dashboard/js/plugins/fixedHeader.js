$.fn.fixedHeader = function (options) {
	const el = $(this);
	if (typeof options === 'string') {
		switch (options) {
			case 'off':
				el.addClass('fixed-off');
				$(window).scroll();
				break;
			case 'on':
				el.removeClass('fixed-off');
				$(window).scroll();
				break;
			case "resize":
				$(window).scroll();
				break;
		}
	} else {
		const parent = el.parent();
		options = $.extend({
			offsetEl: parent
		}, options);

		el.bind('resize', e => { $(window).scroll(); });

		function l() {
			const offset = options.offsetEl.offset(),
				h = el.outerHeight(),
				fh = offset.top;
			const sy = window.scrollY;
			if (!el.hasClass('fixed-off') && sy > fh) {
				el.addClass('fixed');
				parent.css('padding-top', h);
				el.find('div.fixed-inner').addClass('content-width');
			} else {
				el.removeClass('fixed');
				parent.css('padding-top', 0);
				el.find('div.fixed-inner').removeClass('content-width');
			}
		}

		$(window).scroll(l);
		l();
	}
};

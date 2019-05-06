/* eslint-disable prefer-rest-params */

let intercom;

function insertScript(appId) {
	const s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = `https://widget.intercom.io/widget/${appId}`;
	const x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(s, x);
}

function init(config) {
	if (typeof intercom === 'function') {
		intercom('reattach_activator');
		intercom('update', config);
	} else {
		intercom = function ic() {
			intercom.c(arguments);
		};
		intercom.q = [];
		intercom.c = args => {
			intercom.q.push(args);
		};

		window.Intercom = intercom;
		insertScript(config.app_id);
	}
}

function boot(widgetId, config = {}, callback) {
	init(config);
	intercom('boot', {
		...config,
		widget: { activator: widgetId },
		hide_default_launcher: true,
	});

	if (callback) {
		const interval = setInterval(() => {
			if (intercom && intercom.booted) {
				clearInterval(interval);
				callback();
			}
		}, 100);
	}
}

function update(config) {
	intercom('update', config);
}

function shutdown() {
	intercom('shutdown');
}

function onHide(fn) {
	intercom('onHide', fn);
}

function onShow(fn) {
	intercom('onShow', fn);
}

function onUnreadCountChange() {
	intercom('onUnreadCountChange');
}

export default {
	init,
	boot,
	update,
	shutdown,
	onHide,
	onShow,
	onUnreadCountChange,
};

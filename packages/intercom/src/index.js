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

function initIntercom(config) {
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

		if (window.attachEvent) {
			window.attachEvent('onload', insertScript.bind(config.app_id));
		} else {
			window.addEventListener('load', insertScript.bind(config.app_id), false);
		}
	}
}

export default {
	boot(config = {}) {
		initIntercom(config.app_id);
		intercom('boot', config);
	},
	update() {
		intercom('update');
	},
};

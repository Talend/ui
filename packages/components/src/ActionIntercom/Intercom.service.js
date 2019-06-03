/* eslint-disable prefer-rest-params,new-cap */

/* INTERCOM SNIPPET START */
function insertScript(appId) {
	const s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = `https://widget.intercom.io/widget/${appId}`;
	const x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(s, x);
}

function init(config) {
	if (typeof window.Intercom === 'function') {
		window.Intercom('reattach_activator');
		window.Intercom('update', config);
	} else {
		const intercom = function ic() {
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
/* INTERCOM SNIPPET STOP */

function boot(widgetId, config = {}) {
	init(config);
	window.Intercom('boot', {
		...config,
		widget: { activator: widgetId },
		hide_default_launcher: true,
	});
}

function update(config) {
	window.Intercom('update', config);
}

function shutdown() {
	window.Intercom('shutdown');
}

function onHide(fn) {
	window.Intercom('onHide', fn);
}

function onShow(fn) {
	window.Intercom('onShow', fn);
}

const INTERCOM_MAIN_FRAME_SELECTOR =
	'.intercom-namespace .intercom-app div.intercom-messenger-frame';
const INTERCOM_MAIN_FRAME_WIDTH = 376;
const STYLE_DELAY = 500;
function setPosition(domElement) {
	let intercomContainer;
	let customStyle;
	let time = 0;

	const readyInterval = setInterval(() => {
		// avoid infinite interval in case of intercom boot error
		time += 1;
		if (time === 10) {
			clearInterval(readyInterval);
			return;
		}

		// check if intercom boot is done
		intercomContainer = document.querySelector('#intercom-container');
		if (!intercomContainer) {
			return;
		}

		// get trigger element position and center intercom messenger
		const { bottom, left, right } = domElement.getBoundingClientRect();
		const intercomRight = Math.max(
			window.innerWidth /* window */ -
			(right - (right - left) / 2) /* right position of trigger element center */ -
				INTERCOM_MAIN_FRAME_WIDTH / 2 /* center intercom window  */,
			0,
		);
		const intercomLeft = Math.max(window.innerWidth - intercomRight - INTERCOM_MAIN_FRAME_WIDTH, 0);
		const intercomTop = bottom;

		// insert style in intercom style element
		customStyle = document.createElement('style');
		customStyle.appendChild(
			document.createTextNode(`
			${INTERCOM_MAIN_FRAME_SELECTOR} {
				top: ${intercomTop}px;
				left: ${intercomLeft}px;
				right: ${intercomRight}px;
				margin-top: 2rem;
			}
		`),
		);
		intercomContainer.appendChild(customStyle);
		clearInterval(readyInterval);
	}, STYLE_DELAY);

	return function clearIntercomPosition() {
		clearInterval(readyInterval);
		if (intercomContainer && customStyle) {
			// we delay the clear of old style to avoid multiple repositioning
			// causing a flash, if we
			// - remove right away the old one (div back to default intercom position)
			// - add the new style in the interval after 500ms (div jump to new position)
			setTimeout(() => intercomContainer.removeChild(customStyle), STYLE_DELAY);
		}
	};
}

export default {
	init,
	boot,
	update,
	shutdown,
	onHide,
	onShow,
	setPosition,
};

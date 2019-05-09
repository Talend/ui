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

function boot(widgetId, config = {}) {
	init(config);
	intercom('boot', {
		...config,
		widget: { activator: widgetId },
		hide_default_launcher: true,
	});
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

function onUnreadCountChange(fn) {
	intercom('onUnreadCountChange', fn);
}

const INTERCOM_MAIN_FRAME_SELECTOR =
	'.intercom-namespace .intercom-app div.intercom-messenger-frame';
const INTERCOM_MAIN_FRAME_WIDTH = 376;
function setPosition(domElement) {
	let intercomContainer;
	let customStyle;
	let time = 0;

	const readyInterval = setInterval(() => {
		time += 1;
		if (time === 10) {
			clearInterval(readyInterval);
			return;
		}

		intercomContainer = document.querySelector('#intercom-container');
		if (!intercomContainer) {
			return;
		}

		const { bottom, left, right } = domElement.getBoundingClientRect();
		const intercomRight = Math.max(
			window.innerWidth /* window */ -
			(right - (right - left) / 2) /* right position of trigger element center */ -
				INTERCOM_MAIN_FRAME_WIDTH / 2 /* center intercom window  */,
			0,
		);
		const intercomTop = bottom;

		customStyle = document.createElement('style');
		customStyle.appendChild(
			document.createTextNode(`
			${INTERCOM_MAIN_FRAME_SELECTOR} {
				top: ${intercomTop}px;
				right: ${intercomRight}px;
				margin-top: 2rem;
			}
		`),
		);
		intercomContainer.appendChild(customStyle);
		clearInterval(readyInterval);
	}, 500);

	return function clearIntercomPosition() {
		clearInterval(readyInterval);
		if (intercomContainer && customStyle) {
			intercomContainer.removeChild(customStyle);
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
	onUnreadCountChange,
	setPosition,
};

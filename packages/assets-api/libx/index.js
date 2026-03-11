function getPackageVersion(name, version) {
	if (name) {
		const sessionVersion = sessionStorage.getItem(name);
		if (sessionVersion) {
			return sessionVersion;
		}
		const metas = document.querySelectorAll(`meta[name="${name}"]`);
		if (metas.length > 1) {
			console.warn(`Package ${name} is installed multiple times`);
		}
		if (metas.length > 0) {
			return metas[0].getAttribute('content') || version;
		}
	}
	return version;
}
function getURL(path, name, version) {
	const overriddenVersion = getPackageVersion(name, version);
	if (!overriddenVersion) {
		throw new Error(`Version not found for ${name}`);
	}
	return window.Talend.getCDNUrl({ name, version: overriddenVersion, path });
}
const TIMEOUT = 1e4;
function addScript({ src, integrity, ...attr }) {
	const found = !!document.querySelector(`script[src="${src}"]`);
	if (found) {
		return;
	}
	const script = document.createElement('script');
	script.setAttribute('src', src);
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('crossorigin', 'anonymous');
	if (integrity) {
		script.setAttribute('integrity', integrity);
	}
	script.async = false;
	Object.assign(script, attr);
	document.body.appendChild(script);
}
function toDefaultModule(value) {
	return Object.create(null, {
		default: {
			value,
			enumerable: true,
		},
		__esModule: {
			value: true,
		},
		[Symbol.toStringTag]: {
			value: 'Module',
		},
	});
}
function getUMD(name, version, varName, path) {
	const cache = { resolved: false };
	function loaded() {
		if (!varName) {
			return false;
		}
		return !!window[varName];
	}
	if (loaded() && varName) {
		return Promise.resolve(window[varName]);
	}
	const src = getURL(path || '/undefined', name, version);
	console.log('getUMD', src, varName);
	return new Promise((resolve, reject) => {
		function onload() {
			if (!varName) {
				cache.resolved = true;
				resolve(void 0);
			} else {
				console.log(`${varName} onload ok`);
			}
		}
		function onerror(e) {
			console.error(e);
			reject(e);
		}
		addScript({ src, onload, onerror });
		if (varName) {
			const intervalId = setInterval(() => {
				if (loaded()) {
					cache.resolved = true;
					clearInterval(intervalId);
					resolve(window[varName]);
				}
			}, 200);
			setTimeout(() => {
				if (!cache.resolved) {
					clearInterval(intervalId);
					reject(new Error(`UMD from ${src}, ${varName} not found in ${TIMEOUT}`));
				}
			}, TIMEOUT);
		}
	});
}
async function getJSON(path, name, version) {
	const url = getURL(path, name, version);
	const response = await fetch(url);
	if (response.ok) {
		return response.json();
	}
	console.error(`Response not ok: ${response.status} ${response.statusText} from ${url}`);
	return void 0;
}
function addStyle({ href, integrity, ...attr }) {
	const found = !!document.querySelector(`link[href="${href}"]`);
	if (found) {
		return;
	}
	const style = document.createElement('link');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('media', 'print');
	style.setAttribute('onload', 'this.media="all"');
	if (integrity) {
		style.setAttribute('integrity', integrity);
		style.setAttribute('crossorigin', 'anonymous');
	}
	style.setAttribute('href', href);
	Object.assign(style, attr);
	const title = document.getElementsByTagName('TITLE')[0];
	document.head.insertBefore(style, title);
}
if (!window.Talend) {
	window.Talend = {};
}
if (!window.Talend.getCDNUrl) {
	window.Talend.getCDNUrl = info => {
		const CDN_URL = window.Talend.CDN_URL;
		if (CDN_URL) {
			if (CDN_URL.startsWith('/')) {
				const baseTag = document.querySelector('base');
				if (baseTag) {
					const root = baseTag.getAttribute('href') || '';
					if (root !== '/') {
						return `${root}${CDN_URL}/${info.name}/${info.version}${info.path}`;
					}
				}
			}
			return `${CDN_URL}/${info.name}/${info.version}${info.path}`;
		}
		return `https://statics.cloud.talend.com/${info.name}/${info.version}${info.path}`;
	};
}
var index_default = {
	getURL,
	getUMD,
	getJSON,
	addScript,
	addStyle,
	toDefaultModule,
};
export { index_default as default };
//# sourceMappingURL=index.js.map

/* eslint-disable no-console */
declare global {
	interface Window {
		Talend: any;
	}
}

interface Asset {
	name: string;
	version: string;
	path: string;
}
interface Script {
	src: string;
	integrity?: string;
	onload?: () => void;
	onerror?: (e: Error) => void;
}
interface StyleAsset {
	href: string;
	integrity: string;
}

interface TypedResponse<T = any> extends Response {
	/**
	 * this will override `json` method from `Body` that is extended by `Response`
	 * interface Body {
	 *     json(): Promise<any>;
	 * }
	 */
	json<P = T>(): Promise<P>;
}

/**
 *
 * Most of the parameters are optional but in fact they are not optional.
 * They are optional for dev experience because injected by a babel plugin
 */

function getPackageVersion(name?: string, version?: string): string | undefined {
	if (name) {
		const sessionVersion = sessionStorage.getItem(name);
		const metas = document.querySelectorAll(`meta[name="${name}"]`);
		let builtVersion;
		if (metas.length > 0) {
			builtVersion = metas[0].getAttribute('value');
			if (metas.length > 1) {
				console.warn(`Package ${name} is installed multiple times`);
			}
		}
		return sessionVersion || builtVersion || version;
	}
	return version;
}

function getURL(path: string, name?: string, version?: string) {
	const overridedVersion = getPackageVersion(name, version);
	if (!overridedVersion) {
		throw new Error(`Version not found for ${name}`);
	}
	return window.Talend.getCDNUrl({ name, version: overridedVersion, path });
}

const TIMEOUT = 10000;

function addScript({ src, integrity, ...attr }: Script) {
	const found = Array.from(document.querySelectorAll('script').values()).find(
		s => s.getAttribute('src') === src,
	);
	if (found) {
		return;
	}
	const script = document.createElement('script');
	script.setAttribute('src', src);
	script.setAttribute('type', 'text/javascript');
	if (integrity) {
		script.setAttribute('integrity', integrity);
		script.setAttribute('crossorigin', 'anonymous');
	}
	script.async = false;
	Object.assign(script, attr);
	document.body.appendChild(script);
}

function getUMD(name: string, version?: string, varName?: string, path?: string) {
	const cache = { resolved: false };
	function loaded() {
		if (!varName) {
			return false;
		}
		return !!(window as any)[varName];
	}
	if (loaded() && varName) {
		return Promise.resolve({ default: (window as any)[varName] });
	}
	const src = getURL(path || '/undefined', name, version);
	console.log('getUMD', src);

	return new Promise((resolve, reject) => {
		function onload() {
			if (!varName) {
				cache.resolved = true;
				resolve(undefined);
			} else {
				console.log(`${varName} onload ok`);
			}
		}
		function onerror(e: Error) {
			console.error(e);
			reject(e);
		}
		addScript({ src, onload, onerror });
		if (varName) {
			const intervalId = setInterval(() => {
				if (loaded()) {
					cache.resolved = true;
					clearInterval(intervalId);
					resolve({ default: (window as any)[varName] });
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

async function getJSON<T>(path: string, name?: string, version?: string) {
	const url = getURL(path, name, version);
	const response: TypedResponse<T> = await fetch(url);
	if (response.ok) {
		return response.json();
	}
	console.error(`Response not ok: ${response.status} ${response.statusText} from ${url}`);

	return undefined;
}

function addStyle({ href, integrity, ...attr }: StyleAsset) {
	const found = Array.from(document.querySelectorAll('link').values()).find(
		item => item.getAttribute('href') === href,
	);
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

// TODO: move this to ui-scripts.
// implicit dependency, patch if not available
if (!window.Talend) {
	window.Talend = {};
}
if (!window.Talend.getCDNUrl) {
	// eslint-disable-next-line no-console
	console.log('assets.api add window.Talend.getCDNUrl');
	window.Talend.getCDNUrl = (info: Asset) => {
		const CDN_URL = window.Talend.CDN_URL;
		if (CDN_URL) {
			if (CDN_URL.startsWith('/')) {
				const baseTag = document.querySelector('base');
				if (baseTag) {
					const root = baseTag.getAttribute('href') || '';
					return `${root}${CDN_URL}/${info.name}/${info.version}${info.path}`;
				}
			}
			return `${CDN_URL}/${info.name}/${info.version}${info.path}`;
		}
		return `https://unpkg.com/${info.name}@${info.version}${info.path}`;
	};
}

export default {
	getURL,
	getUMD,
	getJSON,
	addScript,
	addStyle,
};

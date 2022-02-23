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

function getPackageVersion(name?: string, version?: string): string | undefined {
	if (name) {
		const sessionVersion = sessionStorage.getItem(name);
		const builtVersion: string = window.Talend.assets?.name;
		return sessionVersion || builtVersion || version;
	}
	return version;
}

function getAssetUrl(path: string, name?: string, version?: string) {
	const overridedVersion = getPackageVersion(name, version);
	const CDN_URL = window.Talend.getCDNUrl({ name, version });
	let root = '';
	if (CDN_URL.startsWith('/')) {
		const baseTag = document.querySelector('base');
		if (baseTag) {
			root = baseTag.getAttribute('href') || '';
		}
	}
	return `${root}${CDN_URL}/${name}/${overridedVersion}${path}`;
}

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

function getUMD(path: string, name?: string, version?: string, varName?: string) {
	const src = getAssetUrl(path, name, version);
	return new Promise((resolve, reject) => {
		function onload() {
			if (!varName) {
				resolve(undefined);
			}
		}
		function onerror(e: Error) {
			reject(e);
		}
		addScript({ src, onload, onerror });
		if (varName) {
			const intervalId = setInterval(() => {
				const mod = (window as any)[varName];
				if (mod) {
					clearInterval(intervalId);
					resolve(mod);
				}
			}, 200);
		}
	});
}

function getLazyUMD(path: string, name?: string, version?: string, varName?: string) {
	return getUMD(path, name, version, varName).then((mod: any) => ({
		default: mod.default,
		__esModule: true,
	}));
}

async function getJSONAsset<T>(info: Asset) {
	const url = getAssetUrl(info.path, info.name, info.version);
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

// implicit dependency, patch if not available
if (!window.Talend.getCDNUrl) {
	window.Talend.getCDNUrl = () => {
		return '/cdn';
	};
}

export default {
	getUrl: getAssetUrl,
	getUMD,
	getLazyUMD,
	getJSON: getJSONAsset,
	addScript,
	addStyle,
};

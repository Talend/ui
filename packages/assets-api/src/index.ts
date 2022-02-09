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

function getAssetUrl({ name, version, path }: Asset) {
	const upgradedVersion = sessionStorage.getItem(name);
	let root = '';
	if (window.Talend.CDN_URL.startsWith('/')) {
		const baseTag = document.querySelector('base');
		if (baseTag) {
			root = baseTag.getAttribute('href') || '';
		}
	}
	return `${root}${window.Talend.CDN_URL}/${name}/${upgradedVersion || version}${path}`;
}

async function getJSONAsset<T>(info: Asset) {
	const url = getAssetUrl(info);
	let response: TypedResponse<T> = await fetch(url);
	if (response.ok) {
		return await response.json();
	} else {
		console.error(`Response not ok: ${response.status} ${response.statusText} from ${url}`);
	}
	return;
}

function addScript({ src, integrity, ...attr }: Script) {
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

function addStyle({ href, integrity, ...attr }: StyleAsset) {
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
	window.Talend = { assetsApi: {} };
}
if (!window.Talend.assetsApi) {
	window.Talend.assetsApi = {};
}

if (!window.Talend.CDN_URL) {
	window.Talend.CDN_URL = '/cdn';
}

if (!window.Talend.assetsApi.getAssetUrl) {
	window.Talend.assetsApi.getUrl = getAssetUrl;
}

if (!window.Talend.assetsApi.getJSON) {
	window.Talend.assetsApi.getJSON = getJSONAsset;
}

if (!window.Talend.assetsApi.addScript) {
	window.Talend.assetsApi.addScript = addScript;
}

if (!window.Talend.assetsApi.addStyle) {
	window.Talend.assetsApi.addStyle = addStyle;
}

export default window.Talend.assetsApi;

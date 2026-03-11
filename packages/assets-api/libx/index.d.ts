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
declare function getURL(path: string, name?: string, version?: string): any;
declare function addScript({ src, integrity, ...attr }: Script): void;
declare function toDefaultModule(value: any): any;
declare function getUMD(
	name: string,
	version?: string,
	varName?: string,
	path?: string,
): Promise<any>;
declare function getJSON<T>(path: string, name?: string, version?: string): Promise<T | undefined>;
declare function addStyle({ href, integrity, ...attr }: StyleAsset): void;
declare const _default: {
	getURL: typeof getURL;
	getUMD: typeof getUMD;
	getJSON: typeof getJSON;
	addScript: typeof addScript;
	addStyle: typeof addStyle;
	toDefaultModule: typeof toDefaultModule;
};

export { type Asset, type Script, type StyleAsset, type TypedResponse, _default as default };

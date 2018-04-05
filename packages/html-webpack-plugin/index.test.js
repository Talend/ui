const Plugin = require('./index');
const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;

const DATA = {
	head: [
		{
			tagName: 'link',
			closeTag: true,
			attributes: { rel: 'stylesheet', type: 'text/css', href: 'app.css' },
		},
	],
	body: [
		{ tagName: 'script', closeTag: true, attributes: { type: 'text/javascript', href: 'app.js' } },
	],
};

const OPTIONS = {
	bodyBefore: [],
};

describe('@talend/html-webpack-plugin', () => {
	let plugin;
	let compiler;
	let compilation;
	let fnc;
	let callback;

	function refresh(options) {
		plugin = new Plugin(options);
		compiler = {
			plugin: jest.fn(),
		};
		plugin.apply(compiler);
		compilation = compiler.plugin.mock.calls[0][1];
		compilation(compiler);
		fnc = compiler.plugin.mock.calls[1][1];
		callback = jest.fn();
	}

	beforeEach(() => {
		refresh();
	});

	it('should support options', () => {
		refresh({ foo: 'bar' });
		expect(plugin.options.foo).toBe('bar');
	});
	it('should apply call compiler/plugin function', () => {
		expect(compiler.plugin).toHaveBeenCalled();
		expect(compiler.plugin.mock.calls[0][0]).toBe('compilation');
		expect(compiler.plugin.mock.calls[1][0]).toBe('html-webpack-plugin-alter-asset-tags');
		expect(typeof fnc).toBe('function');
	});
	it('should call with DATA without options do not modify them', () => {
		fnc(DATA, callback);
		expect(callback).toHaveBeenCalledWith(null, DATA);
	});
	it('should call with option bodyBefore add it to the content', () => {
		const item = { foo: 'bar' };
		refresh({ bodyBefore: [item] });
		fnc(DATA, callback);
		expect(callback.mock.calls[0][1].body[0]).toBe(item);
	});
	it('should call with option loadCSSAsync modify media', () => {
		refresh({ loadCSSAsync: true });
		fnc(DATA, callback);
		expect(callback.mock.calls[0][1].head[0].attributes).toMatchObject({
			media: 'none',
			onload: 'media=\'all\'',
		});
	});
	it('should call with option versions to add TALEND_APP_INFO global', () => {
		refresh({ versions: { '@talend/my-app': '1.2.3' } });
		fnc(DATA, callback);
		expect(callback.mock.calls[0][1].body[0]).toMatchObject({
			tagName: 'script',
			innerHTML: 'TALEND_APP_INFO={\"@talend/my-app\":\"1.2.3\"}',
		});
	});
	it('should call with option appLoaderIcon to add inline style in head', () => {
		const options = { appLoaderIcon: "url('data:image/svg+xml;base64,PHN2...')" };
		refresh(options);
		fnc(DATA, callback);
		expect(callback.mock.calls[0][1].head[0].innerHTML).toBe(
			AppLoader.getLoaderStyle(options.appLoaderIcon)
		);
	});
});

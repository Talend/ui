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

describe('@talend/html-webpack-plugin', () => {
	let plugin;
	let compiler;
	let compilation;
	let pluginExecFn;
	let pluginExecCallback;

	function refresh(options) {
		plugin = new Plugin(options);
		compiler = {
			plugin: jest.fn(),
		};
		plugin.apply(compiler);
		compilation = compiler.plugin.mock.calls[0][1];
		compilation(compiler);
		pluginExecFn = compiler.plugin.mock.calls[1][1];
		pluginExecCallback = jest.fn();
	}

	it('should support options', () => {
		refresh({ foo: 'bar' });
		expect(plugin.options.foo).toBe('bar');
	});
	it('should apply call compiler/plugin function', () => {
		refresh();
		expect(compiler.plugin).toHaveBeenCalled();
		expect(compiler.plugin.mock.calls[0][0]).toBe('compilation');
		expect(compiler.plugin.mock.calls[1][0]).toBe('html-webpack-plugin-alter-asset-tags');
		expect(typeof pluginExecFn).toBe('function');
	});
	it('should not modify data when no option is provided', () => {
		refresh();
		const result = pluginExecFn(DATA, pluginExecCallback);
		expect(result).toEqual(DATA);
	});
	it('should add data before content based on bodyBefore option', () => {
		const item = { foo: 'bar' };
		refresh({ bodyBefore: [item] });
		const result = pluginExecFn(DATA, pluginExecCallback);
		expect(result.body[0]).toBe(item);
	});
	it('should modify <link> media with loadCSSAsync option', () => {
		refresh({ loadCSSAsync: true });
		const result = pluginExecFn(DATA, pluginExecCallback);
		expect(result.head[0].attributes).toMatchObject({
			media: 'none',
			onload: "if(media!='all')media='all'",
		});
	});
	it('should add TALEND_APP_INFO global var with versions option', () => {
		refresh({ versions: { '@talend/my-app': '1.2.3' } });
		const result = pluginExecFn(DATA, pluginExecCallback);
		expect(result.body[0]).toMatchObject({
			tagName: 'script',
			innerHTML: 'TALEND_APP_INFO={"@talend/my-app":"1.2.3"}',
		});
	});
	it('should inline style in head with appLoaderIcon option', () => {
		const options = { appLoaderIcon: "url('data:image/svg+xml;base64,PHN2...')" };
		refresh(options);
		const result = pluginExecFn(DATA, pluginExecCallback);
		expect(result.head[0].innerHTML).toBe(AppLoader.getLoaderStyle(options.appLoaderIcon));
	});
});

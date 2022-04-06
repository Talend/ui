const babel = require('@babel/core');
const options = require('../.babelrc.json');

describe('@babel/plugin-syntax-nullish-coalescing-operator is installed', () => {
	it('should transpile nullish', () => {
		// const options = Object.assign({}, defaultOptions, { filename: output });
		const input = 'const foo = null; const a = foo ?? "default value"';
		const output = babel.transformSync(input, options);
		expect(output.code).toContain(
			'const a = foo !== null && foo !== void 0 ? foo : "default value"',
		);
	});
});

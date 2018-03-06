import {
	default as cmfConsole,
	LOGGER_PREFIX,
	LOGGER_METHODS,
} from '../src/console';

describe('CMF console', () => {
	afterEach(() => {
		delete process.env.NODE_ENV;
	});

	it('should be defined', () => {
		expect(cmfConsole).toBeDefined();
	});

	it('should expose defined function list', () => {
		expect(typeof cmfConsole.trace).toBe('function');
		expect(typeof cmfConsole.debug).toBe('function');
		expect(typeof cmfConsole.log).toBe('function');
		expect(typeof cmfConsole.info).toBe('function');
		expect(typeof cmfConsole.warn).toBe('function');
		expect(typeof cmfConsole.error).toBe('function');
		expect(typeof cmfConsole.unknownMethod).toBe('undefined');
	});

	describe('with development mode', () => {
		let spyList = [];

		beforeAll(() => {
			LOGGER_METHODS.forEach(logMethod => {
				spyList.push(jest.spyOn(global.console, logMethod));
			});
		});

		beforeEach(() => {
			process.env.NODE_ENV = 'development';
		});

		afterAll(() => {
			spyList.forEach(spy => {
				spy.mockReset();
				spy.mockRestore();
			});
		});

		it('should produce output with trace method', () => {
			// given
			const text = 'trace';

			// when
			cmfConsole.trace(text, {});

			// then
			expect(console.trace).toBeCalledWith(LOGGER_PREFIX, text, {});
		});

		it('should produce output with trace method', () => {
			// given
			const text = 'debug';

			// when
			cmfConsole.debug(text);

			// then
			expect(console.debug).toBeCalledWith(LOGGER_PREFIX, text);
		});

		it('should produce output with log method', () => {
			// given
			const text = 'log';

			// when
			cmfConsole.log(text);

			// then
			expect(console.log).toBeCalledWith(LOGGER_PREFIX, text);
		});

		it('should produce output with info method', () => {
			// given
			const text = 'info';

			// when
			cmfConsole.info(text);

			// then
			expect(console.info).toBeCalledWith(LOGGER_PREFIX, text);
		});

		it('should produce output with warn method', () => {
			// given
			const text = 'warn';

			// when
			cmfConsole.warn(text);

			// then
			expect(console.warn).toBeCalledWith(LOGGER_PREFIX, text);
		});

		it('should produce output with error method', () => {
			// given
			const text = 'error';

			// when
			cmfConsole.error(text);

			// then
			expect(console.error).toBeCalledWith(LOGGER_PREFIX, text);
		});
	});

	describe('with production mode', () => {
		let spyList = [];

		beforeAll(() => {
			LOGGER_METHODS.forEach(logMethod => {
				spyList.push(jest.spyOn(global.console, logMethod));
			});
		});

		beforeEach(() => {
			process.env.NODE_ENV = 'production';
		});

		afterAll(() => {
			spyList.forEach(spy => {
				spy.mockReset();
				spy.mockRestore();
			});
		});

		it('should not produce output with trace method', () => {
			// when
			cmfConsole.debug('trace');

			// then
			expect(console.trace).not.toBeCalled();
		});

		it('should not produce output with debug method', () => {
			// when
			cmfConsole.debug('debug');

			// then
			expect(console.debug).not.toBeCalled();
		});

		it('should not produce output with log method', () => {
			// when
			cmfConsole.log('log');

			// then
			expect(console.log).not.toBeCalled();
		});

		it('should not produce output with info method', () => {
			// when
			cmfConsole.info('info');

			// then
			expect(console.info).not.toBeCalled();
		});

		it('should produce output with warn method', () => {
			// given
			const text = 'warn';

			// when
			cmfConsole.warn(text);

			// then
			expect(console.warn).toBeCalledWith(LOGGER_PREFIX, text);
		});

		it('should produce output with error method', () => {
			// given
			const text = 'error';

			// when
			cmfConsole.error(text);

			// then
			expect(console.error).toBeCalledWith(LOGGER_PREFIX, text);
		});
	});

	describe('with any mode', () => {
		let spy;

		beforeEach(() => {
			spy = jest.spyOn(global.console, 'log');
		});

		afterEach(() => {
			cmfConsole.setPrefix(LOGGER_PREFIX);
			spy.mockReset();
			spy.mockRestore();
		});

		it('should accept another prefix', () => {
			// given
			const another_prefix = 'another_prefix';
			const text = 'text';

			// when
			cmfConsole.setPrefix(another_prefix);
			cmfConsole.log(text);

			// then
			expect(console.log).toBeCalledWith(another_prefix, text);
		});

		it('should produce output with several arguments', () => {
			// given
			const text = 'text';
			const number = 42;
			const object = {};

			// when
			cmfConsole.log(text, number, object);

			// then
			expect(console.log).toBeCalledWith(LOGGER_PREFIX, text, number, object);
		});
	});
});

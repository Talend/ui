import et, { TraceKit } from './errorTransformer';

const someString = 'hello';
const rethrowErrorHandler = () => {};

afterEach(() => {
	TraceKit.report = TraceKit.fallback || TraceKit.report;
});

describe('ErrorTransformer', () => {
	describe('listener', () => {
		it('should be function on minimum config', () => {
			expect(typeof et()).toBe('function');
		});

		it('should call successHandler internally', () => {
			const successHandler = t => expect(t).toBe(someString);
			et(
				'',
				{
					successHandler,
					fetchOptions: { response: { text: () => someString, ok: true } },
				},
				{ rethrowErrorHandler },
			)();
		});

		it('should call failedReportHandler internally', () => {
			const failedReportHandler = e => {
				expect(e.message).toBe(someString);
			};
			et(
				'',
				{
					failedReportHandler,
					fetchOptions: { response: someString },
				},
				{ rethrowErrorHandler },
			)();
		});

		it('should return payload', () => {
			const returnedData = et(
				'',
				{
					fetchOptions: { response: { text: () => someString, ok: true } },
				},
				{ rethrowErrorHandler },
			)({ some: someString });

			expect(returnedData).toMatchObject({ some: someString });
		});

		it('should transform payload', () => {
			const expected = { a: 'b' };
			const returnedData = et(
				'',
				{
					payloadMiddleware: () => expected,
					fetchOptions: { response: { text: () => null, ok: true } },
				},
				{ rethrowErrorHandler },
			)();
			expect(returnedData).toMatchObject(expected);
		});
	});

	it('should patch TraceKit_ so it calls rethrowErrorHandler internally', () => {
		// given:
		const report = error => {
			let message;
			try {
				TraceKit.report(error);
			} catch (e) {
				message = e;
			}
			return message;
		};
		// then:
		expect(report(new Error(someString)).message).toBe(someString);
		expect(report(someString)).toBe(someString);

		// when:
		et('', {}, { rethrowErrorHandler });
		// then:
		expect(report()).toBe(undefined);
	});

	it('should call failedTryHandler internally', () => {
		const failedTryHandler = (r, sr, p, to, c) => {
			expect(p).toBe(someString);
			sr(p, to, c + 1);
		};
		et(
			'',
			{
				failedTryHandler,
				retryCount: 5,
				fetchOptions: { response: { ok: false } },
			},
			{ rethrowErrorHandler },
		)(someString);
	});
});

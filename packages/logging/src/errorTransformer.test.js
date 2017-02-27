import TraceKit from 'tracekit';

import et from './errorTransformer';

const someString = 'hello';

describe('ErrorTransformer', () => {
	xdescribe('listener', () => {
		it('should be function on minimum config', () => {
			expect(typeof et()).toBe('function');
		});

		it('should call successHandler internally', () => {
			const successHandler = t => expect(t).toBe(someString);
			et('', {
				successHandler,
				fetchOptions: { response: { text: () => someString, ok: true } },
			})();
		});

		it('should call failedTryHandler internally', () => {
			const failedTryHandler = (e, sr, p) => { expect(p).toBe(someString); };
			et('', {
				failedTryHandler,
				fetchOptions: { response: { error: true, ok: true } },
			})(someString);
		});

		it('should call failedReportHandler internally', () => {
			const failedReportHandler = (e) => { expect(e.message).toBe(someString); };
			et('', {
				failedReportHandler,
				fetchOptions: { response: someString },
			})();
		});

		it('should return payload', () => {
			const returnedData = et('', {
				fetchOptions: { response: { text: () => someString, ok: true } },
			})({ some: someString });

			expect(returnedData).toMatchObject({ some: someString });
		});

		it('should transform payload', () => {
			const expected = { a: 'b' };
			const returnedData = et('', {
				payloadMiddleware: () => expected,
				fetchOptions: { response: { text: () => null, ok: true } },
			})();
			expect(returnedData).toMatchObject(expected);
		});
	});

	it('should patch TraceKit so it does not throw error', () => {
		// given:
		TraceKit.report = TraceKit.fallback || TraceKit.report;
		const testReport = () => {
			let message;
			try {
				TraceKit.report(new Error(someString));
			} catch (e) {
				message = e.message;
			}
			return message;
		};
		// before:
		expect(testReport()).toBe(someString);
		// when:
		et();
		// then:
		expect(testReport()).toBe(undefined);
	});
});

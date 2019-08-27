import onError from '../src/onError';

/**
	bootstrap,
	addAction,
	hasReportURL,
	getReportInfo,
	report,
	getErrors,
	middleware,
	createObjectURL,
 */


describe('onError', () => {
	describe('bootstrap', () => {
		it('shoud fill internal values', () => {
			expect(onError.hasReportURL()).toBe(false);
		});
	});
});

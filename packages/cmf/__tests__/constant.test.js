import CONSTANT from '../src/constant';

describe('constants', () => {
	it('should expose some CONSTANT', () => {
		expect(CONSTANT.REQUEST_SETTINGS).not.toBe(undefined);
		expect(CONSTANT.REQUEST_KO).not.toBe(undefined);
		expect(CONSTANT.REQUEST_OK).not.toBe(undefined);

		expect(typeof CONSTANT.REQUEST_SETTINGS).toBe('string');
		expect(typeof CONSTANT.REQUEST_KO).toBe('string');
		expect(typeof CONSTANT.REQUEST_OK).toBe('string');
	});
});

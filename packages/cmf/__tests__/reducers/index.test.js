import reducers from '../../src/reducers';

describe('check reducers are combined', () => {
	it('should expose one reducer', () => {
		expect(typeof reducers).toEqual('function');
	});
});

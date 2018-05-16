import selectors from '../../src/selectors';
import * as collections from '../../src/selectors/collections';
import * as router from '../../src/selectors/router';
import toJS from '../../src/selectors/toJS';

describe('selectors', () => {
	it('should expose collections selectors', () => {
		expect(selectors.collections).toEqual(collections);
	});
	it('should expose router selectors', () => {
		expect(selectors.router).toEqual(router);
	});
	it('should expose toJS selectors', () => {
		expect(selectors.toJS).toEqual(toJS);
	});
});


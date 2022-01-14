import { delay, call, select } from 'redux-saga/effects';
import Immutable from 'immutable';
import selectors from '../../src/selectors';
import {
	waitFor,
} from '../../src/sagas/collection';

describe('waitFor', () => {
	it('should waitFor wait for a collection to exists', () => {
		const withoutCollection = {
			cmf: {
				collections: new Immutable.Map({}),
			},
		};
		const withCollection = withoutCollection.cmf.collections.set('foo', new Immutable.Map({}));
		const gen = waitFor('foo');
		expect(gen.next().value).toEqual(select(selectors.collections.get, 'foo'));
		expect(gen.next().value).toEqual(delay(10));
		expect(gen.next().value).toEqual(select(selectors.collections.get, 'foo'));
		expect(gen.next(withCollection).value).toBeUndefined();
	});
});

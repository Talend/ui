import { delay, select, put, call, take } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
import { Map } from 'immutable';
import pendingMaybeNeeded, {
	ensurePendersCollectionExists,
	findPenders,
	findPenderById,
} from './pending';

import { PENDING_DELAY_TO_SHOW, SHOW_PENDING, PENDING_COLLECTION_NAME } from '../constants';

const addOrReplace = cmf.actions.collections.addOrReplace;

describe('test pending status', () => {
	it('should create penders collection in cmf.collections', () => {
		const gen = ensurePendersCollectionExists();
		expect(gen.next().value).toEqual(select(findPenders));

		// if penders collection has been create
		expect(gen.next(undefined).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, new Map())),
		);
		// the saga is finished
		expect(gen.next()).toEqual({ done: true, value: undefined });
	});
	it('should retrieve penders collection from cmf.collections', () => {
		const gen = ensurePendersCollectionExists();
		expect(gen.next().value).toEqual(select(findPenders));

		expect(gen.next(new Map())).toEqual({ done: true, value: undefined });
	});
	it('should pend and then clear pending', () => {
		const gen = pendingMaybeNeeded('', 'streams:create');
		let pendersCollection = new Map();

		expect(gen.next().value).toEqual(delay(PENDING_DELAY_TO_SHOW));
		expect(gen.next().value).toEqual(call(ensurePendersCollectionExists));
		expect(gen.next().value).toEqual(select(findPenders));

		pendersCollection = pendersCollection.set('#streams:create', SHOW_PENDING);
		expect(gen.next(pendersCollection).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, pendersCollection)),
		);
		expect(gen.next().value).toEqual(take('DO_NOT_QUIT'));
		expect(gen.next().value).toEqual(call(ensurePendersCollectionExists));
		expect(gen.next().value).toEqual(select(findPenderById, '#streams:create'));
		expect(gen.next(SHOW_PENDING).value).toEqual(select(findPenders));

		pendersCollection = pendersCollection.delete('#streams:create');
		expect(gen.next(pendersCollection).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, pendersCollection)),
		);
		// the saga is finished
		expect(gen.next()).toEqual({ done: true, value: undefined });
	});
});

import { delay, select, put, call, take } from 'redux-saga/effects';
import { vi } from 'vitest';
import cmf from '@talend/react-cmf';
import pendingMaybeNeeded, {
	ensurePendersCollectionExists,
	findPenders,
	findPenderById,
} from './pending';

import { PENDING_DELAY_TO_SHOW, SHOW_PENDING, PENDING_COLLECTION_NAME } from '../constants';

const addOrReplace = cmf.actions.collections.addOrReplace;

/**
 * Returns a minimal mock with the Immutable.Map interface required by the production saga.
 * Production code (pending.js) still uses Immutable — this decouples the test from that dependency.
 */
const makeCollection = () => ({
	set: vi.fn(() => makeCollection()),
	delete: vi.fn(() => makeCollection()),
});

describe('test pending status', () => {
	it('should create penders collection in cmf.collections', () => {
		const gen = ensurePendersCollectionExists();
		expect(gen.next().value).toEqual(select(findPenders));

		// when no collection exists, saga puts a new empty collection
		expect(gen.next(undefined).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, expect.any(Object))),
		);
		// the saga is finished
		expect(gen.next()).toEqual({ done: true, value: undefined });
	});
	it('should retrieve penders collection from cmf.collections', () => {
		const gen = ensurePendersCollectionExists();
		expect(gen.next().value).toEqual(select(findPenders));

		// existing truthy collection → saga skips creation and finishes
		expect(gen.next(makeCollection())).toEqual({ done: true, value: undefined });
	});
	it('should pend and then clear pending', () => {
		const gen = pendingMaybeNeeded('', 'streams:create');
		const pendersCollection = makeCollection();

		expect(gen.next().value).toEqual(delay(PENDING_DELAY_TO_SHOW));
		expect(gen.next().value).toEqual(call(ensurePendersCollectionExists));
		expect(gen.next().value).toEqual(select(findPenders));

		// saga receives collection, calls .set(), yields put with updated collection
		expect(gen.next(pendersCollection).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, expect.any(Object))),
		);
		expect(gen.next().value).toEqual(take('DO_NOT_QUIT'));
		expect(gen.next().value).toEqual(call(ensurePendersCollectionExists));
		expect(gen.next().value).toEqual(select(findPenderById, '#streams:create'));
		expect(gen.next(SHOW_PENDING).value).toEqual(select(findPenders));

		// saga receives collection, calls .delete(), yields put with updated collection
		expect(gen.next(pendersCollection).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, expect.any(Object))),
		);
		// the saga is finished
		expect(gen.next()).toEqual({ done: true, value: undefined });
	});
});

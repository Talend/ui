import { delay, select, put, call, take } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
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

		// when no collection exists, saga puts a new empty plain object collection
		expect(gen.next(undefined).value).toEqual(put(addOrReplace(PENDING_COLLECTION_NAME, {})));
		// the saga is finished
		expect(gen.next()).toEqual({ done: true, value: undefined });
	});
	it('should retrieve penders collection from cmf.collections', () => {
		const gen = ensurePendersCollectionExists();
		expect(gen.next().value).toEqual(select(findPenders));

		// existing truthy plain object → saga skips creation and finishes
		expect(gen.next({})).toEqual({ done: true, value: undefined });
	});
	it('should pend and then clear pending', () => {
		const gen = pendingMaybeNeeded('', 'streams:create');
		const pendersCollection = {};

		expect(gen.next().value).toEqual(delay(PENDING_DELAY_TO_SHOW));
		expect(gen.next().value).toEqual(call(ensurePendersCollectionExists));
		expect(gen.next().value).toEqual(select(findPenders));

		// saga spreads collection + new entry, yields put with updated plain object
		expect(gen.next(pendersCollection).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, { '#streams:create': SHOW_PENDING })),
		);
		expect(gen.next().value).toEqual(take('DO_NOT_QUIT'));
		expect(gen.next().value).toEqual(call(ensurePendersCollectionExists));
		expect(gen.next().value).toEqual(select(findPenderById, '#streams:create'));
		expect(gen.next(SHOW_PENDING).value).toEqual(select(findPenders));

		// saga destructures entry out, yields put with empty plain object
		expect(gen.next({ '#streams:create': SHOW_PENDING }).value).toEqual(
			put(addOrReplace(PENDING_COLLECTION_NAME, {})),
		);
		// the saga is finished
		expect(gen.next()).toEqual({ done: true, value: undefined });
	});
});

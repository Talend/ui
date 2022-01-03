import { sagaList, actions } from './Saga.saga';

describe('Saga component actions', () => {
	const sagaId = 'sagaId';
	function saga(attribute) {
		return attribute;
	}

	afterEach(() => {
		delete sagaList[sagaId];
	});

	it('should add the saga to the list', () => {
		// given
		const attribute = 10;
		// when
		actions.startSaga(sagaId, saga, attribute);
		// then
		expect(sagaList[sagaId]).toBe(saga);
	});

	it('should remove the saga from the list', () => {
		// given
		sagaList[sagaId] = saga;
		// when
		actions.stopSaga(sagaId);
		// then
		expect(sagaList[sagaId]).toBeUndefined();
	});
});

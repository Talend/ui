import { sagaList, actions } from './Saga.saga';

describe('Saga component actions', () => {
	function saga(attribute) {
		return attribute;
	}

	it('should add the saga to the list', () => {
		// given
		const attribute = 10;
		const sagaId = 'sagaId';
		// when
		actions.startSaga(sagaId, saga, attribute);
		// then
		expect(sagaList[sagaId]).toBe(saga);
	});

	it('should remove the saga from the list', () => {
		// given
		const sagaId = 'sagaId';
		expect(sagaList[sagaId]).toBe(saga);
		// when
		actions.stopSaga(sagaId);
		// then
		expect(sagaList[sagaId]).toBe(undefined);
	});
});

import { render } from '@testing-library/react';
import { CmfRegisteredSagaComponent } from './CmfRegisteredSaga.component';

const defaultMockUuid = '42';

describe('CmfRegisteredSagaComponent', () => {
	it('should dispatch actions', () => {
		// given
		const startSaga = jest.fn();
		const stopSaga = jest.fn();
		const sagaId = 'sagaId';
		const sagaAttributes = { attr: 'ibute' };
		// when
		const { unmount } = render(
			<CmfRegisteredSagaComponent
				startSaga={startSaga}
				stopSaga={stopSaga}
				sagaId={sagaId}
				sagaAttributes={sagaAttributes}
			/>,
		);
		// then
		expect(startSaga).toHaveBeenCalledWith(
			{
				componentId: '42',
				type: 'DID_MOUNT',
			},
			{ attr: 'ibute', componentId: 'default', saga: 'sagaId' },
		);

		unmount();

		expect(stopSaga).toHaveBeenCalledWith(
			{ type: 'WILL_UNMOUNT', componentId: defaultMockUuid },
			{ componentId: 'default', saga: 'sagaId' },
		);
	});
});

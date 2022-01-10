import React from 'react';
import { mount } from 'enzyme';
import { CmfRegisteredSagaComponent } from './CmfRegisteredSaga.component';

const defaultMockUuid = '42';
jest.mock('uuid', () => ({ v4: () => defaultMockUuid }));

describe('CmfRegisteredSagaComponent', () => {
	it('should dispatch actions', () => {
		// given
		const startSaga = jest.fn();
		const stopSaga = jest.fn();
		const sagaId = 'sagaId';
		const sagaAttributes = { attr: 'ibute' };
		// when
		const wrapper = mount(
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

		wrapper.unmount();

		expect(stopSaga).toHaveBeenCalledWith(
			{ type: 'WILL_UNMOUNT', componentId: defaultMockUuid },
			{ componentId: 'default', saga: 'sagaId' },
		);
	});
});

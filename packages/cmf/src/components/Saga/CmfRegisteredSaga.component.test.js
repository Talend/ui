import React from 'react';
import { mount } from 'enzyme';
import { CmfRegisteredSagaComponent } from './CmfRegisteredSaga.component';

describe('CmfRegisteredSagaComponent', () => {
	it('should dispatch actions', () => {
		// given
		const dispatch = jest.fn();
		const sagaId = 'sagaId';
		const sagaAttributes = { attr: 'ibute' };
		// when
		const wrapper = mount(
			<CmfRegisteredSagaComponent
				dispatch={dispatch}
				sagaId={sagaId}
				sagaAttributes={sagaAttributes}
			/>,
		);
		// then
		expect(dispatch).toHaveBeenCalledWith({
			componentId: 'default',
			event: null,
			props: {
				attr: 'ibute',
			},
			saga: 'sagaId',
			type: 'DID_MOUNT_SAGA_START',
		});

		wrapper.unmount();

		expect(dispatch).toHaveBeenCalledWith({
			event: null,
			type: 'WILL_UNMOUNT_SAGA_STOP_sagaId',
		});
	});
});

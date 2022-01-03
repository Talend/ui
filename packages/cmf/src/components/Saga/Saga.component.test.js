import React from 'react';
import { mount } from 'enzyme';
import { SagaComponent } from './Saga.component';

const defaultMockUuid = '42';
jest.mock('uuid', () => ({ v4: () => defaultMockUuid }));

describe('Saga Component', () => {
	it('should dispatch actions', () => {
		// given
		const dispatch = jest.fn();
		const saga = function sagaToBePassed() {};
		const sagaAttributes = { attr: 'ibute' };
		// when
		const wrapper = mount(
			<SagaComponent
				dispatch={dispatch}
				// eslint-disable-next-line react/jsx-no-bind
				sagaFunction={saga}
				sagaAttributes={sagaAttributes}
			/>,
		);
		// then
		expect(dispatch).toHaveBeenCalledWith({
			type: 'SAGA_COMPONENT_START',
			sagaId: defaultMockUuid,
			sagaProps: {
				attr: 'ibute',
			},
		});

		wrapper.unmount();

		expect(dispatch).toHaveBeenCalledWith({
			type: `SAGA_COMPONENT_STOP-${defaultMockUuid}`,
		});
	});
});

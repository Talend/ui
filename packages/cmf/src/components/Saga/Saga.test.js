import React from 'react';
import { mount } from 'enzyme';
import { SagaComponent } from './Saga';

describe('Saga Component', () => {
	it('should dispatch actions', () => {
		// given
		const dispatch = jest.fn();
		const saga = function sagaToBePassed() {};
		const sagaAttributes = { attr: 'ibute' };
		const sagaId = 'sagaId';
		// when
		const wrapper = mount(
			<SagaComponent
				sagaId={sagaId}
				dispatch={dispatch}
				// eslint-disable-next-line react/jsx-no-bind
				saga={saga}
				sagaAttributes={sagaAttributes}
			/>,
		);
		// then
		expect(dispatch).toHaveBeenCalledWith({
			type: 'SAGA_COMPONENT_START',
			sagaId,
			sagaProps: {
				attr: 'ibute',
			},
		});

		wrapper.unmount();

		expect(dispatch).toHaveBeenCalledWith({
			event: null,
			type: 'SAGA_COMPONENT_STOP-sagaId',
		});
	});
});

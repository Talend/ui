import React from 'react';
import { render } from '@testing-library/react';
import { SagaComponent } from './Saga.component';

const defaultMockUuid = '42';
jest.mock('uuid', () => ({ v4: () => defaultMockUuid }));

describe('Saga Component', () => {
	it('should dispatch actions', () => {
		// given
		const startSaga = jest.fn();
		const stopSaga = jest.fn();
		const saga = function sagaToBePassed() {};
		const sagaAttributes = { attr: 'ibute' };
		// when
		const wrapper = render(
			<SagaComponent
				stopSaga={stopSaga}
				startSaga={startSaga}
				// eslint-disable-next-line react/jsx-no-bind
				saga={saga}
				sagaAttributes={sagaAttributes}
			/>,
		);
		// then
		expect(startSaga).toHaveBeenCalledWith('42', saga, { attr: 'ibute' });

		wrapper.unmount();

		expect(stopSaga).toHaveBeenCalledWith('42');
	});
});

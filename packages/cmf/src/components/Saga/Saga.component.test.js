import { render } from '@testing-library/react';
import { SagaComponent } from './Saga.component';

describe('Saga Component', () => {
	it('should dispatch actions', () => {
		// given
		const startSaga = jest.fn();
		const stopSaga = jest.fn();
		const saga = function sagaToBePassed() {};
		const sagaAttributes = { attr: 'ibute' };
		// when
		const { unmount } = render(
			<SagaComponent
				stopSaga={stopSaga}
				startSaga={startSaga}
				saga={saga}
				sagaAttributes={sagaAttributes}
			/>,
		);
		// then
		expect(startSaga).toHaveBeenCalledWith('42', saga, { attr: 'ibute' });

		unmount();

		expect(stopSaga).toHaveBeenCalledWith('42');
	});
});

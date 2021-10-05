import {
	addContext,
	receiveMessage,
	deleteACK,
} from './ack';

describe('actions.ack.addContext', () => {
	it('should return action', () => {
		const action = addContext(null, {
			requestId: '123',
			data: { foo: 'bar' },
			actionCreator: 'my super action creator id',
		});
		expect(action).toMatchSnapshot();
	});
});

describe('actions.ack.receiveMessage', () => {
	it('should return action', () => {
		const action = receiveMessage(null, {
			requestId: '123',
		});
		expect(action).toMatchSnapshot();
	});
});


describe('actions.ack.deleteACK', () => {
	it('should return action', () => {
		const action = deleteACK(null, {
			requestId: '123',
		});
		expect(action).toMatchSnapshot();
	});
});

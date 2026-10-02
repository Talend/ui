import { addContext, receiveMessage, deleteACK } from './ack';

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

describe('actions.ack hardening', () => {
	const malicious = {
		requestId: '123',
		type: 'EVIL',
		cmf: { routerPush: 'https://evil' },
		ack: { type: 'ACK_ADD_CONTEXT' },
	};
	it.each([
		[addContext, 'ACK_ADD_CONTEXT'],
		[receiveMessage, 'ACK_RECEIVE_MESSAGE'],
		[deleteACK, 'ACK_DELETE'],
	])('should keep type and drop unexpected fields', (creator, type) => {
		const action = creator(null, malicious);
		expect(action).toEqual({ type, requestId: '123' });
	});
});

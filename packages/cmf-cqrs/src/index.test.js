import {
	actions,
	ACKDispatcher,
	constants,
	middlewares,
	reducers,
	ackProcessed,
} from './';

describe('cmf-cqrs', () => {
	it('should export API', () => {
		expect(actions).not.toBe(undefined);
		expect(ACKDispatcher).not.toBe(undefined);
		expect(constants).not.toBe(undefined);
		expect(middlewares).not.toBe(undefined);
		expect(reducers).not.toBe(undefined);
		expect(ackProcessed).not.toBe(undefined);
	});
	it('should export constant', () => {
		expect(constants.ACK_ADD_CONTEXT).toBe('ACK_ADD_CONTEXT');
		expect(constants.ACK_RECEIVE_MESSAGE).toBe('ACK_RECEIVE_MESSAGE');
		expect(constants.ACK_DELETE).toBe('ACK_DELETE');
	});
});

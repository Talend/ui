import { actions, ACKDispatcher, constants, middlewares, reducers, sagas, ackProcessed } from '.';

describe('cmf-cqrs', () => {
	it('should export API', () => {
		expect(actions).toBeDefined();
		expect(ACKDispatcher).toBeDefined();
		expect(constants).toBeDefined();
		expect(middlewares).toBeDefined();
		expect(reducers).toBeDefined();
		expect(sagas).toBeDefined();
		expect(ackProcessed).toBeDefined();
	});
	it('should export constant', () => {
		expect(constants.ACK_ADD_CONTEXT).toBe('ACK_ADD_CONTEXT');
		expect(constants.ACK_RECEIVE_MESSAGE).toBe('ACK_RECEIVE_MESSAGE');
		expect(constants.ACK_DELETE).toBe('ACK_DELETE');
	});
});

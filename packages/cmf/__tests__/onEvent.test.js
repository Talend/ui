import Immutable from 'immutable';
import onEvent from '../src/onEvent';

describe('onEvent', () => {
	describe('getOnEventSetStateHandler', () => {
		let instance;
		let config;
		let currentHandler;
		beforeEach(() => {
			instance = {
				props: {
					setState: jest.fn(),
					state: new Immutable.Map({ docked: false }),
				},
			};
			config = {};
			currentHandler = jest.fn();
		});
		it('should return a function', () => {
			const handler = onEvent.getOnEventSetStateHandler(instance, {}, config, currentHandler);
			expect(typeof handler).toBe('function');
		});
		it('the handler should call the currentHandler with the same args', () => {
			const handler = onEvent.getOnEventSetStateHandler(instance, {}, config, currentHandler);
			const args = [{ type: 'click' }, { foo: 'bar' }];
			handler(...args);
			expect(currentHandler).toHaveBeenCalledWith(...args);
		});
		it('the handler should call props.setState with static value', () => {
			const handler = onEvent.getOnEventSetStateHandler(instance, {}, config, currentHandler);
			config.foo = true;
			handler();
			expect(instance.props.setState).toHaveBeenCalledWith(config);
		});
		it('the handler should call props.setState with parsed arguments', () => {
			const handler = onEvent.getOnEventSetStateHandler(instance, {}, config, currentHandler);
			const args = [{ type: 'click' }, { foo: 'bar' }];
			config.inProgress = [1, 'foo'];
			handler(...args);
			expect(instance.props.setState).toHaveBeenCalledWith({ inProgress: 'bar' });
		});
		it('the handler should call props.setState with parsed arguments', () => {
			const handler = onEvent.getOnEventSetStateHandler(instance, {}, config, currentHandler);
			const args = [{ type: 'click' }, { foo: 'bar' }];
			config.inProgress = [1];
			handler(...args);
			expect(instance.props.setState).toHaveBeenCalledWith({ inProgress: args[1] });
		});
		it('the handler should call props.setState and toggle a value', () => {
			const handler = onEvent.getOnEventSetStateHandler(instance, {}, config, currentHandler);
			const args = [{ type: 'click' }, { foo: 'bar' }];
			config.docked = 'toggle';
			handler(...args);
			const callback = instance.props.setState.mock.calls[0][0];
			callback({ state: instance.props.state });
			expect(instance.props.setState.mock.calls[1][0]).toEqual({ docked: true });
		});
	});
});

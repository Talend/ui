import mock from 'react-cmf/lib/mock';

import action, { getActionsProps, } from './actionAPI';

describe('actionAPI.getActionsProps', () => {
	it('should default import have all the things', () => {
		expect(action.getProps).toBe(getActionsProps);
	});

	it('should return props for one action', () => {
		const context = mock.context();
		context.store.dispatch = jest.fn();
		const props = action.getProps(context, 'menu:demo');
		expect(props.id).toBe('menu');
		expect(typeof props.onClick).toBe('function');
		props.model = {};
		props.payload = {
			type: 'MY_SUPER_ACTION',
		};
		props.onClick();
		const calls = context.store.dispatch.mock.calls;
		expect(calls[0][0].model).toBe(props.model);
		expect(calls[0][0].type).toBe('MY_SUPER_ACTION');
	});
});

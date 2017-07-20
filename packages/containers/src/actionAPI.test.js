import mock from 'react-cmf/lib/mock';

import action, { getActionsProps } from './actionAPI';

describe('actionAPI.getActionsProps', () => {
	it('should default import have all the things', () => {
		expect(action.getProps).toBe(getActionsProps);
	});

	it('should return props for one action', () => {
		const context = mock.context();
		const model = { model: true };
		context.store.dispatch = jest.fn();
		const props = action.getProps(context, 'menu:demo', model);
		expect(props.id).toBe('menu');
		expect(typeof props.onClick).toBe('function');
		props.onClick();

		const calls = context.store.dispatch.mock.calls;
		expect(calls[0][0].model).toBe(props.model);
		expect(calls[0][0].type).toBe('TEST_MENU');
	});

	it('should return props for one action using action creator', () => {
		const context = mock.context();
		const model = { model: true };
		context.store.dispatch = jest.fn();
		context.registry['actionCreator:action-creator'] = jest.fn();

		const props = action.getProps(context, 'menu:actionCreator', model);
		expect(props.id).toBe('menu:actionCreator');
		expect(props.actionCreator).toBe('action-creator');

		expect(typeof props.onClick).toBe('function');
		props.onClick();

		expect(context.registry['actionCreator:action-creator']).toHaveBeenCalled();
	});

	it('should return props for multiple actions', () => {
		const context = mock.context();
		const model = { model: {} };
		context.store.dispatch = jest.fn();
		const props = action.getProps(context, ['menu:demo', 'menu:article'], model);
		expect(Array.isArray(props)).toBe(true);
		const a1 = props[0];
		const a2 = props[1];
		expect(a1.id).toBe('menu');
		expect(a2.id).toBe('menu:article');
		expect(a1.model).toBe(model);
		expect(a2.model).toBe(model);
		expect(typeof a1.onClick).toBe('function');
		expect(typeof a2.onClick).toBe('function');

		a1.onClick();
		a2.onClick();
		const calls = context.store.dispatch.mock.calls;
		expect(calls[0][0].model).toBe(a1.model);
		expect(calls[0][0].type).toBe('TEST_MENU');

		expect(calls[1][0].model).toBe(a2.model);
		expect(calls[1][0].type).toBe('@@router/CALL_HISTORY_METHOD');
	});
});

describe('actionAPI.evalExpressions', () => {
	it('should eval available', () => {
		const actionInfo = {
			available: 'isInTest',
			disabled: 'isDisabled',
			inProgress: 'isInProgress',
			label: 'Run',
			labelInProgress: 'Running',
			labelExpression: 'getLabel',
		};
		function isInTest({ context }) {
			return context.router.location === '/test';
		}
		function isDisabled({ payload }) {
			return payload.model.value;
		}
		function isInProgress({ payload }) {
			return payload.model.value;
		}
		function getLabel({ payload }) {
			return payload.model.value ? payload.labelInProgress : payload.label;
		}

		const modelTruthy = { value: true };
		const modelFalsy = { value: false };
		const context = {
			registry: {
				'expression:isInTest': isInTest,
				'expression:isDisabled': isDisabled,
				'expression:isInProgress': isInProgress,
				'expression:getLabel': getLabel,
			},
			router: {
				location: '/test',
			},
		};
		const truthyAction = action.evalExpressions(actionInfo, context, { model: modelTruthy });
		expect(truthyAction.available).toBe(true);
		expect(truthyAction.disabled).toBe(true);
		expect(truthyAction.inProgress).toBe(true);
		expect(truthyAction.label).toBe('Running');

		const falsyAction = action.evalExpressions(actionInfo, context, { model: modelFalsy });
		expect(falsyAction.available).toBe(true);
		expect(falsyAction.disabled).toBe(false);
		expect(falsyAction.inProgress).toBe(false);
		expect(falsyAction.label).toBe('Run');
	})
})

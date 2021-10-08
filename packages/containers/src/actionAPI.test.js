import { mock } from '@talend/react-cmf';

import action, { getActionsProps } from './actionAPI';

describe('actionAPI.getActionsProps', () => {
	it('should default import have all the things', () => {
		expect(action.getProps).toBe(getActionsProps);
	});

	it('should return props for one action', () => {
		const context = mock.store.context();
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
		const context = mock.store.context();
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
		const context = mock.store.context();
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

	it('should return props for multiple object actions', () => {
		const context = mock.store.context();
		const model = { model: {} };
		const a1 = {
			label: 'A1',
			payload: {
				type: 'ACTION_ONE',
			},
		};
		const a2 = {
			label: 'A2',
			actionCreator: 'my',
		};
		const props = action.getProps(context, [a1, a2], model);
		expect(props[0].label).toBe('A1');
		expect(props[0].payload.type).toBe('ACTION_ONE');
		expect(props[0].model).toBe(model);
		expect(props[1].label).toBe('A2');
		expect(props[1].actionCreator).toBe('my');
		expect(props[1].model).toBe(model);
	});
});

describe('actionAPI.evalExpressions', () => {
	it('should eval props', () => {
		const actionInfo = {
			active: 'isActive',
			disabled: 'isDisabled',
			inProgress: 'isInProgress',
			label: 'Run',
			labelInProgress: 'Running',
			iconExpression: 'getIcon',
			labelExpression: 'getLabel',
		};
		function isActive({ payload }) {
			return payload.model.value;
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

		function getIcon({ payload }) {
			return payload.model.value ? 'talend-icon' : 'pas-talend-icon';
		}

		const modelTruthy = { value: true };
		const modelFalsy = { value: false };
		const context = {
			registry: {
				'expression:isActive': isActive,
				'expression:isDisabled': isDisabled,
				'expression:isInProgress': isInProgress,
				'expression:getLabel': getLabel,
				'expression:getIcon': getIcon,
			},
			store: {
				getState: () => ({
					routing: {
						locationBeforeTransitions: {
							pathname: '/test',
						},
					},
				}),
			},
		};
		const truthyAction = action.evalExpressions(actionInfo, context, { model: modelTruthy });
		expect(truthyAction.active).toBe(true);
		expect(truthyAction.disabled).toBe(true);
		expect(truthyAction.inProgress).toBe(true);
		expect(truthyAction.label).toBe('Running');
		expect(truthyAction.icon).toBe('talend-icon');

		const falsyAction = action.evalExpressions(actionInfo, context, { model: modelFalsy });
		expect(falsyAction.active).toBe(false);
		expect(falsyAction.disabled).toBe(false);
		expect(falsyAction.inProgress).toBe(false);
		expect(falsyAction.label).toBe('Run');
		expect(falsyAction.icon).toBe('pas-talend-icon');
	});

	it('try to evaluate any action properties ending with `Expression`', () => {
		const actionInfo = {
			active: 'isActive',
			disabled: 'isDisabled',
			inProgress: 'isInProgress',
			label: 'Run',
			labelInProgress: 'Running',
			labelExpression: 'getLabel',
			iconExpression: 'getIcon',
			hrefExpression: 'getHref',
		};

		function isActive({ payload }) {
			return payload.model.value;
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

		function getIcon({ payload }) {
			return payload.model.value ? 'talend-icon' : 'pas-talend-icon';
		}

		function getHref({ payload }) {
			return payload.model.value ? 'link1' : 'link2';
		}

		const modelTruthy = { value: true };
		const modelFalsy = { value: false };
		const context = {
			registry: {
				'expression:isActive': isActive,
				'expression:isDisabled': isDisabled,
				'expression:isInProgress': isInProgress,
				'expression:getLabel': getLabel,
				'expression:getIcon': getIcon,
				'expression:getHref': getHref,
			},
			store: {
				getState: () => ({
					routing: {
						locationBeforeTransitions: {
							pathname: '/test',
						},
					},
				}),
			},
		};
		const truthyAction = action.evalExpressions(actionInfo, context, { model: modelTruthy });
		expect(truthyAction.active).toBe(true);
		expect(truthyAction.disabled).toBe(true);
		expect(truthyAction.inProgress).toBe(true);
		expect(truthyAction.label).toBe('Running');
		expect(truthyAction.icon).toBe('talend-icon');
		expect(truthyAction.href).toBe('link1');

		const falsyAction = action.evalExpressions(actionInfo, context, { model: modelFalsy });
		expect(falsyAction.active).toBe(false);
		expect(falsyAction.disabled).toBe(false);
		expect(falsyAction.inProgress).toBe(false);
		expect(falsyAction.label).toBe('Run');
		expect(falsyAction.icon).toBe('pas-talend-icon');
		expect(falsyAction.href).toBe('link2');
	});
});

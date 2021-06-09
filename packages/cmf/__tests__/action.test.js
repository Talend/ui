import actionAPI from '../src/action';
import {mock} from '../src';

describe('CMF action', () => {
	let state;
	let context;
	let emptyContext;
	let settings;

	beforeEach(() => {
		settings = mock.store.settings();
		state = mock.store.state();
		state.cmf.settings = settings;
		context = mock.store.context(state);
		emptyContext = mock.store.emptyContext();
	});
	it('getActionsById should return action from settings', () => {
		const actions = actionAPI.getActionsById(context);
		expect(actions).toBe(state.cmf.settings.actions);
		expect(typeof actions).toBe('object');
	});
	it('getActionsById should return empty if settings are not loaded', () => {
		const actions = actionAPI.getActionsById(emptyContext);
		expect(actions).toEqual({});
	});
	it('getContentTypeActions should return an array of actions', () => {
		const actions = actionAPI.getContentTypeActions(context, 'article', 'primary');
		expect(Array.isArray(actions)).toBe(true);
		expect(actions.length > 0).toBe(true);
	});
	it('getContentTypeActions should return an empty array if no state', () => {
		const actions = actionAPI.getContentTypeActions(emptyContext, 'article', 'primary');
		expect(Array.isArray(actions)).toBe(true);
		expect(actions.length === 0).toBe(true);
	});

	it('getActionInfo should return an object', () => {
		const id = 'menu:article';
		const action = actionAPI.getActionInfo(context, id);
		expect(typeof action).toBe('object');
		expect(action.id).toBe('menu:article');
		expect(action.name).toBe('My article');
		expect(action.icon).toBe('icon-article');
	});
	it('getActionInfo should return a copy', () => {
		const id = 'menu:article';
		const action1 = actionAPI.getActionInfo(context, id);
		const action2 = actionAPI.getActionInfo(context, id);
		expect(action1).not.toBe(action2);
	});
	it('getActionInfo should throw an error', () => {
		const id = 'notfound';
		const test = () => actionAPI.getActionInfo(context, id);
		expect(test).toThrowError(`action not found id: ${id}`);
	});
	it('getActionObject should return an object', () => {
		const id = 'menu:article';
		const data = {
			value: 'bar',
		};
		const event = {
			target: 'foo',
		};
		const action = actionAPI.getActionObject(context, id, event, data);
		expect(typeof action).toBe('object');
		expect(action.id).toBe(undefined);
		expect(action.name).toBe(undefined);
		expect(action.icon).toBe(undefined);
		expect(action.data).toBe(data);
		expect(action.event).toBe(event);
		expect(action.context).toBe(context);
	});
	it('getActionObject should support actionCreator', () => {
		settings.actions.myaction = {
			id: 'myaction',
			name: 'My action',
			type: 'MY_ACTION_TYPE',
			actionCreator: 'myActionCreator',
		};
		context.registry = {};
		context.registry['actionCreator:myActionCreator'] = function creator() {
			return Object.assign(
				{
					data: true,
				},
				settings.actions.myaction,
			);
		};
		const id = 'myaction';
		const action = actionAPI.getActionObject(context, id);
		expect(typeof action).toBe('object');
		expect(action.id).toBe('myaction');
		expect(action.name).toBe('My action');
		expect(action.actionCreator).toBe('myActionCreator');
		expect(action.icon).toBe(undefined);
		expect(action.data).toBe(true);
		expect(action.event).toBe(undefined);
		expect(action.context).toBe(undefined);
	});

	it('getActionObject should support action object', () => {
		const obj = {
			payload: {
				type: 'MY_ACTION_TYPE',
				extra: 'foo',
			},
		};
		const action = actionAPI.getActionObject(context, obj);
		expect(typeof action).toBe('object');
		expect(action.type).toBe('MY_ACTION_TYPE');
		expect(action.extra).toBe('foo');
	});

	it('getActionObject should support action object with actionCreator', () => {
		const obj = {
			actionCreator: 'myActionCreator',
		};
		context.registry = {};
		context.registry['actionCreator:myActionCreator'] = jest.fn(() => ({ type: 'MY_ACTION_TYPE' }));
		const action = actionAPI.getActionObject(context, obj);
		expect(context.registry['actionCreator:myActionCreator']).toHaveBeenCalled();
		expect(action.type).toBe('MY_ACTION_TYPE');
	});

	it('mapDispatchToProps should build a dispatchable action for any on[eventName] in props', () => {
		function dispatch() {}
		const props = {
			onClick: 'menu:article',
			onAnything: 'menu:article',
		};
		const mapped = actionAPI.mapDispatchToProps(dispatch, props);
		expect(typeof mapped.onClick).toBe('function');
		expect(typeof mapped.onAnything).toBe('function');
	});
	it('mapDispatchToProps should merge props with any resolved dispatchable action creator', () => {
		function dispatch() {}
		const props = {
			onClick: 'menu:article',
			onAnything: 'menu:article',
			elementId: 'id',
		};
		const mapped = actionAPI.mapDispatchToProps(dispatch, props);
		expect(typeof mapped.onClick).toBe('function');
		expect(typeof mapped.onAnything).toBe('function');
		expect(mapped.elementId).toBe('id');
	});
});

describe('getOnProps', () => {
	it('getOnProps should return only attribute that start with on', () => {
		const props = {
			notByOn: 'noByOn',
			onBy: 'onBy',
			exists: 'exists',
			onClick: 'onClick',
			onNotExists: 'onNotExists',
			'with-weird id': 'with-weird id',
		};
		const result = actionAPI.getOnProps(props);
		expect(Array.isArray(result)).toBe(true);
		expect(result).toEqual(['onBy', 'onClick', 'onNotExists']);
	});
});

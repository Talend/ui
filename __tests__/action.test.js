import actionAPI from '../src/action';
const settings = require('./settings.json');

describe('uiAbstraction action', () => {
  let state;
  let context;
  let emptyContext;

  beforeEach(() => {
    state = {
      settings,
    };
    context = {
      store: {
        getState() {
          return state;
        },
      },
    };
    emptyContext = {
      store: {
        getState() {
          return {
            initialized: false,
            settings: {
              contentTypes: {},
              actions: {},
              views: {},
            },
          };
        },
      },
    };
  });
  it('getActionsById should return action from settings', () => {
    const actions = actionAPI.getActionsById(context);
    expect(actions).toBe(state.settings.actions);
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
  it('getActionCreatorFunction should return a function', () => {
    const id = 'myactioncreator';

    function creator() {}
    context.registry = {};
    context.registry[`actionCreator:${id}`] = creator;
    const actionCreator = actionAPI.getActionCreatorFunction(context, id);
    expect(typeof actionCreator).toBe('function');
  });
  it('getActionCreatorFunction should throw an error', () => {
    const id = 'myactioncreator';
    context.registry = {};
    const test = () => actionAPI.getActionCreatorFunction(context, id);
    expect(test).toThrowError(`actionCreator not found in the registry: ${id}`);
  });
  it('getActionInfo should return an object', () => {
    const id = 'menu:article';
    const action = actionAPI.getActionInfo(context, id);
    expect(typeof action).toBe('object');
    expect(action.id).toBe('menu:article');
    expect(action.name).toBe('My article');
    expect(action.icon).toBe('icon-article');
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
    expect(action.id).toBe('menu:article');
    expect(action.name).toBe('My article');
    expect(action.icon).toBe('icon-article');
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
      return Object.assign({
        data: true,
      }, settings.actions.myaction);
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
  it('mapDispatchToProps should bind onClilck', () => {
    const dispatched = {
      called: false,
    };
    function dispatch(action) {
      dispatched.called = true;
      dispatched.action = action;
    }
    const mapped = actionAPI.mapDispatchToProps(dispatch);
    expect(typeof mapped.onClick).toBe('function');
    const data = {
      action: settings.actions['menu:article'],
    };
    mapped.onClick(null, data, context);
    expect(dispatched.called).toBe(true);
    expect(dispatched.action).toBe(data.action);
  });
  it('mapDispatchToProps should throw exception if no action found', () => {
    const dispatched = {
      called: false,
    };
    function dispatch(action) {
      dispatched.called = true;
      dispatched.action = action;
    }
    const mapped = actionAPI.mapDispatchToProps(dispatch);
    function callWithEmptyData() {
      mapped.onClick(null, {}, context);
    }
    expect(callWithEmptyData).toThrowError('no action found undefined');
  });

});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import {
  addOrReplaceCollection,
  removeCollection,
  addComponentState,
  mergeComponentState,
  removeComponentState,
} from '../../../src/settings/actions/';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test collection management action creators', () => {
  it('addOrReplaceCollection dispatch well formed action object', () => {
    expect(addOrReplaceCollection('collectionId', 'data can be anything')).toEqual({
      type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
      collectionId: 'collectionId',
      data: 'data can be anything',
    });
  });

  it('removeCollection dispatch well formed action object', () => {
    const expectedActions = [{
      type: 'REACT_CMF.COLLECTION_REMOVE',
      collectionId: 'collectionId',
    }];

    const store = mockStore({
      settings: {
        collections: new Map().set('collectionId', 'data'),
      },
    });

    store.dispatch(removeCollection('collectionId'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('removeCollection throw when collection doesn\'t exist', () => {
    const store = mockStore({
      settings: {
        collections: new Map(),
      },
    });
    expect(() => {
      store.dispatch(removeCollection('unknown collection'));
    }).toThrowError('Can\'t remove collection unknown collection since it doesn\'t already exist.');
  });
});

describe('test component state management action creators', () => {
  it('addComponentState dispatch well formed acton object', () => {
    const expectedActions = [{
      type: 'REACT_CMF.COMPONENT_ADD_STATE',
      componentName: 'componentName',
      key: 'key',
      initialComponentState: { searchQuery: '' },
    }];

    const store = mockStore({
      settings: {
        collections: new Map().set('collectionId', new Map()),
        components: new Map().set('component', new Map().set('key', new Map())),
      },
    });
    store.dispatch(addComponentState('componentName', 'key', { searchQuery: '' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('addComponentState throw when a couple of componentName, key already exist', () => {
    const store = mockStore({
      settings: {
        collections: new Map().set('collectionId', new Map()),
        components: new Map().set('componentName', new Map().set('keyId', new Map())),
      },
    });
    expect(() => {
      store.dispatch(addComponentState('componentName', 'keyId', { searchQuery: '' }));
    }).toThrowError('Can\'t set up your component componentName on key keyId since this association already exist');
  });

  it('mergeComponentState dispatch well formed acton object', () => {
    const expectedActions = [{
      type: 'REACT_CMF.COMPONENT_MERGE_STATE',
      componentName: 'componentName',
      key: 'key',
      componentState: { searchQuery: 'JSON' },
    }];
    const store = mockStore({
      settings: {
        collections: new Map().set('collectionId', new Map()),
        components: new Map().set('componentName', new Map().set('key', new Map())),
      },
    });
    store.dispatch(mergeComponentState('componentName', 'key', { searchQuery: 'JSON' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('mergeComponentState throw when a couple of componentName, keyId doesn\'t exist', () => {
    const store = mockStore({
      settings: {
        collections: new Map().set('collection', new Map()),
        components: new Map().set('component', new Map().set('key', new Map())),
      },
    });
    expect(() => {
      store.dispatch(mergeComponentState('componentName', 'keyId', { searchQuery: 'JSON' }));
    }).toThrowError('The component state can\'t be merged since the componentName, keyId association doesn\'t exist.');
    expect(() => {
      store.dispatch(mergeComponentState('component', 'keyId', { searchQuery: 'JSON' }));
    }).toThrowError('The component state can\'t be merged since the component, keyId association doesn\'t exist.');
    expect(() => {
      store.dispatch(mergeComponentState('componentName', 'keyId', { searchQuery: 'JSON' }));
    }).toThrowError('The component state can\'t be merged since the componentName, keyId association doesn\'t exist.');
  });

  it('removeComponentState dispatch well formed acton object', () => {
    const expectedActions = [{
      type: 'REACT_CMF.COMPONENT_REMOVE_STATE',
      componentName: 'componentName',
      key: 'key',
    }];

    const store = mockStore({
      settings: {
        collections: new Map().set('collectionId', new Map()),
        components: new Map().set('componentName', new Map().set('key', new Map())),
      },
    });
    store.dispatch(removeComponentState('componentName', 'key'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('removeComponentState throw when a couple of componentName, collectionId doesn\'t exist', () => {
    const store = mockStore({
      settings: {
        collections: new Map().set('collection', new Map()),
        components: new Map().set('component', new Map().set('key', new Map())),
      },
    });
    expect(() => {
      store.dispatch(removeComponentState('componentName', 'keyId'));
    }).toThrowError('The component can\'t be removed since the componentName, keyId association doesn\'t exist.');
    expect(() => {
      store.dispatch(removeComponentState('component', 'keyId'));
    }).toThrowError('The component can\'t be removed since the component, keyId association doesn\'t exist.');
    expect(() => {
      store.dispatch(removeComponentState('componentName', 'keyId'));
    }).toThrowError('The component can\'t be removed since the componentName, keyId association doesn\'t exist.');
  });
});

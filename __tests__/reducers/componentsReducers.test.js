import { Map } from 'immutable';
import matchers from 'jasmine-immutable-matchers';

import { componentsReducer } from '../../src/reducers/componentsReducers';

describe('check component management reducer', () => {
  const initialState = {
    components: new Map().set('component1', new Map().set('key1', new Map().set('searchQuery', ''))),
  };

  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  it('REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection state tracking to the store if nor the component or collection exist', () => {
    expect(componentsReducer(initialState, {
      type: 'REACT_CMF.COMPONENT_ADD_STATE',
      componentName: 'componentName',
      key: 'key',
      initialComponentState: { searchQuery: 'data' },
    }).components).toEqualImmutable(new Map()
      .set('componentName', new Map()
        .set('key', new Map()
          .set('searchQuery', 'data')
        )
      ).set('component1', new Map()
        .set('key1', new Map()
          .set('searchQuery', '')
        )
      )
    );
  });

  it('REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection state tracking to the store if nor the component or collection exist event if initialState is undefined', () => {
    expect(componentsReducer(initialState, {
      type: 'REACT_CMF.COMPONENT_ADD_STATE',
      componentName: 'componentName',
      key: 'key',
      initialComponentState: undefined,
    }).components).toEqualImmutable(new Map()
      .set('componentName', new Map()
        .set('key', new Map())
      ).set('component1', new Map()
        .set('key1', new Map()
          .set('searchQuery', '')
        )
      )
    );
  });

  it('REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection state tracking to the store if the collection don\'t exist', () => {
    expect(componentsReducer(initialState, {
      type: 'REACT_CMF.COMPONENT_ADD_STATE',
      componentName: 'component1',
      key: 'key',
      initialComponentState: 'initialState',
    }).components).toEqualImmutable(new Map()
      .set('component1', new Map()
        .set('key1', new Map()
          .set('searchQuery', '')
        )
        .set('key', 'initialState')
    ));
  });

  it('REACT_CMF.COMPONENT_MERGE_STATE should properly merge component/collection state into the store', () => {
    expect(componentsReducer(initialState, {
      type: 'REACT_CMF.COMPONENT_MERGE_STATE',
      componentName: 'component1',
      key: 'key1',
      componentState: { searchQuery: 'data' },
    }).components).toEqualImmutable(new Map()
      .set('component1', new Map()
        .set('key1', new Map()
          .set('searchQuery', 'data')
      )
    ));
  });

  it('REACT_CMF.COMPONENT_REMOVE_STATE should properly add component/collection state tracking to the store', () => {
    expect(componentsReducer(initialState, {
      type: 'REACT_CMF.COMPONENT_REMOVE_STATE',
      componentName: 'component1',
      key: 'key1',
    }).components).toEqualImmutable(new Map()
      .set('component1', new Map())
    );
  });
});

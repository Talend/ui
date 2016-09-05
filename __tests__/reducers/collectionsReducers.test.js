import { Map } from 'immutable';
import matchers from 'jasmine-immutable-matchers';

import { collectionsReducer } from '../../src/reducers/collectionsReducers';

describe('check collection management reducer', () => {
  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  const initialState = {
    collections: new Map().set('collection1', 'super data'),
  };

  it('REACT_CMF.COLLECTION_ADD_OR_REPLACE should properly add data into store', () => {
    expect(collectionsReducer(initialState, {
      type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
      collectionId: 'collectionId',
      data: 'data can be anything',
    }).collections).toEqualImmutable(new Map()
      .set('collection1', 'super data')
      .set('collectionId', 'data can be anything'));
  });

  it('REACT_CMF.COLLECTION_ADD_OR_REPLACE should properly replace data into store', () => {
    expect(collectionsReducer(initialState, {
      type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
      collectionId: 'collection1',
      data: 'data can be anything',
    }).collections).toEqualImmutable(new Map().set('collection1', 'data can be anything'));
  });

  it('REACT_CMF.COLLECTION_REMOVE should properly remove collection from the store', () => {
    expect(collectionsReducer(initialState, {
      type: 'REACT_CMF.COLLECTION_REMOVE',
      collectionId: 'collection1',
    }).collections).toEqualImmutable(new Map());
  });
});

import React from 'react';
import Mapping from './Mapping.js'
import renderer from 'react-test-renderer';

const mapping = [
  {
    source: 'elem_in_1',
    target: 'elem_out_1'
  },
  {
    source: 'elem_in_2',
    target: 'elem_out_2'
  },
  {
    source: 'elem_in_3',
    target: 'elem_out_3'
  }
]

it('mapping', () => {
  // create React tree
  const tree = renderer
    .create(<Mapping mapping={mapping} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

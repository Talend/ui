import React from 'react';
import Schema from './Schema.js'
import renderer from 'react-test-renderer';
import { SchemaType, MappingSide } from '../Constants';

const emptySchema = []
const schema = [ 'element_1', 'element_2', 'element_3' ]

it('single-schema', () => {
  // create React tree
  const tree = renderer
    .create(<Schema schema={schema} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('empty-schema', () => {
  // create React tree
  const tree = renderer
    .create(<Schema schema={emptySchema} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

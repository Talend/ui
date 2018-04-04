import React from 'react';
import renderer from 'react-test-renderer';
import List from './List';
import * as TestData from './TestData';

const elements = [TestData.element1, TestData.element2];

it('simple-list', () => {
	// create React tree
	const tree = renderer
		.create(
			<List
				elements={elements}
        classNameProvider={TestData.classNameProvider}
      	dataKeys={TestData.dataKeys}
      	rowDataGetter={TestData.rowDataGetter}
      	rowRenderers={TestData.rowRenderers}
        draggable={false}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

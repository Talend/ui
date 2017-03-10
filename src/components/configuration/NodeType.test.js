import React from 'react';
import { shallow } from 'enzyme';
import NodeType from './NodeType.component';

describe('Testing <NodeType>', () => {
	it('should log an error if rendered', () => {
		expect(() => {
			shallow(<NodeType />);
		}).toThrowError('<NodeType> elements are for DataFlow configuration only and should not be rendered');
	});
});

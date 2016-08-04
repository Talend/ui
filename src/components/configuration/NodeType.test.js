jest.unmock('./NodeType.component.jsx');

import React from 'react';
import { shallow } from 'enzyme';
import NodeType from './NodeType.component.jsx';

describe('Testing <NodeType>', () => {
    it('should log an error if rendered', () => {
        const wrapper = shallow(<NodeType />);
    });
});

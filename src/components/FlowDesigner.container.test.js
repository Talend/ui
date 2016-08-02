jest.unmock('./FlowDesigner.container.jsx');

import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { FlowDesigner } from './FlowDesigner.container.jsx';

const mockStore = configureMockStore();
const store = mockStore({
    flowDesigner: {
        nodes: [],
    },
});

const noOp = () => {};

describe('', () => {
    it('<FlowDesigner /> should render as svg element', () => {
        const wrapper = shallow(<FlowDesigner setNodeTypes={noOp} store={store} />);
        expect(wrapper.is('svg')).toBe(true);
    });
});

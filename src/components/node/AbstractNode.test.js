jest.unmock('classnames');
jest.unmock('./AbstractNode.component.jsx');
jest.unmock('../../2DTools');
jest.unmock('../../constants/flowdesigner.model');
jest.unmock('d3-selection');
jest.unmock('d3-drag');

import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Map } from 'immutable';

import { NodeRecord, PositionRecord, SizeRecord } from '../../constants/flowdesigner.model';
import AbstractNode from './AbstractNode.component.jsx';

const node = new NodeRecord({
    id: 'id',
    position: new PositionRecord({ x: 100, y: 50 }),
    nodeSize: new SizeRecord({ width: 125, height: 75 }),
    attr: new Map(),
});

describe('Testing <AbstractNode>', () => {
    it('should create a bare node component with provided position', () => {
        const wrapper = shallow(<AbstractNode node={node} />);
        const rect = wrapper.find('g[transform]');
        expect(rect.prop('transform')).toBe('translate(100,50)');
    });

    it('call the injected onClick action when clicked', () => {
        const onClick = jasmine.createSpy('onClick');
        const wrapper = shallow(<AbstractNode node={node} onClick={onClick} />);
        wrapper.find('g[transform]').simulate('click');
        expect(onClick.and.identity()).toEqual('onClick');
        expect(onClick).toHaveBeenCalled();
        expect(onClick.calls.count()).toEqual(1);
    });

    // if anyone got a clue on how to test react + d3 events

    // it('call the injected onDragStart action when drag action start', () => {
    //     const onDragStart = jasmine.createSpy('onDragStart');
    //     const wrapper = mount(<AbstractNode node={node} onDragStart={onDragStart} />);
    //     // wrapper.find('g[transform]').simulate('dragStart');
    //     ReactTestUtils.Simulate.dragStart(wrapper.find('g[transform]'));
    //     expect(onDragStart.and.identity()).toEqual('onDragStart');
    //     expect(onDragStart).toHaveBeenCalled();
    //     expect(onDragStart.calls.count()).toEqual(1);
    // });

    // it('call the injected onDrag action when drag action start', () => {
    //     fail();
    // });

    // it('call the injected onDragEnd action when drag action start', () => {
    //     fail();
    // });

    it('should fire an error if its rendered without a children set up', () => {
        shallow(<AbstractNode node={node} />);
    });
});

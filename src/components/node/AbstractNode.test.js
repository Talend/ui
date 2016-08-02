jest.unmock('classnames');
jest.unmock('./AbstractNode.component.jsx');
jest.unmock('../../2DTools');
jest.unmock('../../constants/flowdesigner.model');

import React from 'react';
import { shallow } from 'enzyme';
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

    it('call the injected onDragStart action when drag action start', () => {
        fail();
    });

    it('call the injected onDrag action when drag action start', () => {
        fail();
    });

    it('call the injected onDragEnd action when drag action start', () => {
        fail();
    });

    it('should fire an error if its rendered without a children set up', () => {
        spyOn(console, 'error');
        shallow(<AbstractNode node={node} />);
        expect(console.error).toHaveBeenCalled();
    });
});

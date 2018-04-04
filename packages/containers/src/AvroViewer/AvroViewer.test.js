import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';
import Container, { DEFAULT_STATE } from './AvroViewer.container';
import Connect from './AvroViewer.connect';

const sample = {
	data: [
		{
			value: {
				id: {
					value: 0,
					quality: 1,
				},
				name: {
					value: 'Nom de la gare',
					quality: 1,
				},
				price: {
					value: 'Code UIC',
					quality: 1,
				},
				date: {
					value: 1522849040903,
					quality: 1,
				},
			},
			quality: 1,
		},
	],
	schema: [
		{
			name: 'id',
			doc: 'Id',
			type: {
				type: 'integer',
			},
			'@talend-quality@': {
				0: 5,
				1: 65,
				'-1': 30,
			},
		},
	],
};

describe('Connect', () => {
	it('should connect AvroViewer', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('AvroViewer container', () => {
	it('should render', () => {
		const props = {
			sample,
		};
		const wrapper = shallow(<Container {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('AvroViewer select', () => {
	it('should call onSelect when select event trigger', () => {
		const event = {};
		const jsonpath = "$['price']";
		const onSelect = jest.fn();
		const dispatchActionCreator = jest.fn();
		const setState = jest.fn();
		const props = {
			sample,
			setState,
			onSelect,
			dispatchActionCreator,
			actionCreatorSelect: 'myAction',
		};
		const wrapper = shallow(<Container {...props} />);
		wrapper.instance().onSelect(event, jsonpath);
		expect(setState).toHaveBeenCalled();
		expect(dispatchActionCreator).toHaveBeenCalled();
	});
});

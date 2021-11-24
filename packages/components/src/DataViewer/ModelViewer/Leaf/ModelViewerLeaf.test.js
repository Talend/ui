import React from 'react';
import { shallow } from 'enzyme';
import Component from './ModelViewerLeaf.component';
import { defaultGetDisplayValue, defaultGetDisplayKey } from '../ModelViewer.container';

const type = { dqType: 'typeSem' };

describe('ModelViewerLeaf', () => {
	it('should render ModelViewerLeaf', () => {
		const value = {
			name: 'toto',
			type,
		};
		const wrapper = shallow(
			<Component
				dataKey="myDataKey"
				getDisplayValue={defaultGetDisplayValue}
				jsonpath="$"
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ModelViewerLeaf highlighted', () => {
		const value = {
			type,
		};
		const wrapper = shallow(
			<Component
				datasetId="42"
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				hasSemanticAwareness
				jsonpath="$"
				jsonPathSelection="$"
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ModelViewerLeaf with additional data', () => {
		const value = {
			type,
		};
		const wrapper = shallow(
			<Component
				datasetId="42"
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				hasSemanticAwareness
				jsonpath="$"
				jsonPathSelection="$"
				value={value}
				renderLeafOptions={v => <div>Render some data, can use value {v.type}</div>}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should call onSelect when click on the leaf', () => {
		const value = {
			name: 'toto',
			type: [{ dqType: 'firstType' }, { dqType: 'secondType' }],
		};
		const event = {};
		const jsonpath = '$';
		const onSelect = jest.fn();
		const wrapper = shallow(
			<Component
				datasetId="42"
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				jsonpath="$"
				onSelect={onSelect}
				value={value}
			/>,
		);
		wrapper.find('button').simulate('click', event);
		expect(onSelect).toHaveBeenCalledWith(event, jsonpath, value);
	});
});

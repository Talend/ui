import React from 'react';
import { mount } from 'enzyme';
import { useColumnChooserClient } from './columnChooserClient.hook';

describe('columnChooserClient', () => {
	const columns = [
		{
			label: 'label1',
			order: 1,
			hidden: false,
			locked: false,
			someData: 'someData1',
		},
		{
			label: 'label2',
			order: 2,
			hidden: false,
			locked: false,
			someData: 'someData2',
		},
		{
			label: 'label3',
			order: 3,
			hidden: false,
			locked: false,
			someData: 'someData3',
		},
	];
	const event = {};
	it('should update state columns', () => {
		// given
		const newColumns = [
			{
				label: 'label1',
				order: 1,
				hidden: true,
				locked: false,
			},
			{
				label: 'label3',
				order: 2,
				hidden: false,
				locked: false,
			},
			{
				label: 'label2',
				order: 3,
				hidden: false,
				locked: false,
			},
		];
		// when
		let state;
		const TestComponent = () => {
			const { submitColumnChooser, stateColumnChooserClient } = useColumnChooserClient(columns);
			state = stateColumnChooserClient;
			return <button onClick={() => submitColumnChooser(event, newColumns)}>My Button</button>;
		};
		const wrapper = mount(<TestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(state.columns).toEqual([
			{ hidden: true, label: 'label1', locked: false, order: 1, someData: 'someData1' },
			{ hidden: false, label: 'label2', locked: false, order: 3, someData: 'someData2' },
			{ hidden: false, label: 'label3', locked: false, order: 2, someData: 'someData3' },
		]);
	});
	it('should trigger custom submit', () => {
		// given
		const newColumns = [
			{
				label: 'label1',
				order: 1,
				hidden: true,
				locked: false,
			},
		];
		const submitCustom = jest.fn();
		// when
		const TestComponent = () => {
			const { submitColumnChooser } = useColumnChooserClient(columns, submitCustom);
			return <button onClick={() => submitColumnChooser(event, newColumns)}>My Button</button>;
		};
		const wrapper = mount(<TestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(submitCustom.mock.calls[0][0]).toEqual({});
		expect(submitCustom.mock.calls[0][1]).toBe(columns);
	});
});

import React from 'react';
import { shallow } from 'enzyme';
import { Line } from 'recharts';

import {
	renderLine,
	renderLegend,
	handleMouseLeave,
	handleMouseEnter,
	handleMouseDown,
} from './LineChart.component'; // eslint-disable-line import/no-named-as-default

describe('linechart', () => {
	describe('line chart configuration', () => {
		it('should return lines with the right configuration', () => {
			const data = [
				{
					name: 'H2 2015',
					Unassigned: 5,
					'Coco  Bongo': 1,
					'User 2 malade': 7,
					'Owner 2 Cocorico': 0,
				},
				{
					name: 'H2 2016',
					Unassigned: 2,
					'Coco  Bongo': 0,
					'User 2 malade': 0,
					'Owner 2 Cocorico': 18,
				},
			];
			// selected/higlight
			const wrapper = shallow(<div>{renderLine(data, 'name', 'Coco  Bongo', [], [])}</div>);
			expect(wrapper.find(Line).length).toBe(4);
			// not selected/higlight
			const notSelectedLineProps = wrapper
				.find(Line)
				.at(0)
				.getElement().props;
			expect(notSelectedLineProps.strokeWidth).toBe(1.5);
			expect(notSelectedLineProps.strokeOpacity).toBe(0.25);
			expect(notSelectedLineProps.activeDot.r).toBe(0);
			expect(notSelectedLineProps.dot.r).toBe(0);
			// not selected/higlight
			const selectedLine = wrapper
				.find(Line)
				.at(1)
				.getElement().props;
			expect(selectedLine.strokeWidth).toBe(2);
			expect(selectedLine.strokeOpacity).toBe(1);
			expect(selectedLine.activeDot.r).toBe(5);
			expect(selectedLine.dot.r).toBe(3);
		});
		it('should return legends configuration', () => {
			const data = {
				payload: [
					{
						inactive: false,
						dataKey: 'Coco  Bongo',
						type: 'circle',
						color: '#0565A7',
						value: 'Coco  Bongo',
					},
					{
						inactive: false,
						dataKey: 'Jane Doe',
						type: 'circle',
						color: '#70A338',
						value: 'Jane Doe',
					},
				],
			};
			const mouseDownFn = jest.fn();
			const mouseEnterFn = jest.fn();
			const mouseLeaveFn = jest.fn();

			// selected/higlight
			const wrapper = shallow(
				<div>{renderLegend('Jane Doe', [], mouseDownFn, mouseEnterFn, mouseLeaveFn)(data)}</div>,
			);
			expect(wrapper.find('.td-legend-item').length).toBe(2);
			// not selected/higlight
			const firstLegend = wrapper
				.find('.td-legend-item')
				.at(0)
				.getElement().props;
			expect(firstLegend.className.indexOf('td-legend-selected') > -1).toBeFalsy();
			// higlighted
			const secondLegend = wrapper
				.find('.td-legend-item')
				.at(1)
				.getElement().props;
			expect(secondLegend.className.indexOf('td-legend-selected') > -1).toBeTruthy();
		});
		it('should legend mouseLeave event', () => {
			// given
			const setHighlightLegend = jest.fn();
			// when
			handleMouseLeave(setHighlightLegend)();
			// then
			expect(setHighlightLegend).toHaveBeenCalledWith('');
		});
		it('should legend mouseEnter event', () => {
			// given
			const setHighlightLegend = jest.fn();
			// when
			handleMouseEnter(setHighlightLegend)({ dataKey: 'key1' });
			// then
			expect(setHighlightLegend).toHaveBeenCalledWith('key1');
		});
		it('should legend mouseDown event add legend', () => {
			// given
			const setSelectedLegends = jest.fn();
			const selectedLegends = ['key2'];
			// when
			handleMouseDown(selectedLegends, setSelectedLegends)({ dataKey: 'key1' });
			// then
			expect(setSelectedLegends).toHaveBeenCalledWith(['key2', 'key1']);
		});
		it('should legend mouseDown event remove legend', () => {
			// given
			const setSelectedLegends = jest.fn();
			const selectedLegends = ['key1'];
			// when
			handleMouseDown(selectedLegends, setSelectedLegends)({ dataKey: 'key1' });
			// then
			expect(setSelectedLegends).toHaveBeenCalledWith([]);
		});
	});
});

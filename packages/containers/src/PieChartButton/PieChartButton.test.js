import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Connected, { ContainerPieChartButton } from './PieChartButton.connect';

describe('PieChartButton connected', () => {
	it('should connect filter', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerPieChartButton.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerPieChartButton);
	});
});

describe('Filter container', () => {
	it('should render', () => {
		const initialState = new Map({
			model: [
				{ percentage: 10, color: 'red' },
				{ percentage: 15, color: 'blue' },
				{ percentage: 5, color: 'cyan' },
				{ percentage: 20, color: 'yellow' },
				{ percentage: 15, color: 'black' },
			],
		});
		expect(
			shallow(<ContainerPieChartButton initialState={initialState} />).getElement(),
		).toMatchSnapshot();
	});
});

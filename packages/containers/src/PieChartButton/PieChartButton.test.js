import React from 'react';
import Immutable, { Map } from 'immutable';
import { shallow } from 'enzyme';
import Connected, { ContainerPieChartButton } from './PieChartButton.connect';

describe('PieChartButton connected', () => {
	it('should connect filter', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerPieChartButton.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerPieChartButton);
	});
});

describe('PieChartButton container', () => {
	it('should render', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'red' },
				{ percentage: 15, color: 'blue' },
				{ percentage: 5, color: 'cyan' },
				{ percentage: 20, color: 'yellow' },
				{ percentage: 15, color: 'black' },
			],
		});
		expect(
			shallow(<ContainerPieChartButton state={initialState} />).getElement(),
		).toMatchSnapshot();
	});

	it('should render not available pie chart button', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'red' },
				{ percentage: 15, color: 'blue' },
				{ percentage: 5, color: 'cyan' },
				{ percentage: 20, color: 'yellow' },
				{ percentage: 15, color: 'black' },
			],
			available: false,
		});
		expect(
			shallow(<ContainerPieChartButton state={initialState} />).getElement().props.available,
		).toBeFalsy();
	});

	it('should render loading pie chart button', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'red' },
				{ percentage: 15, color: 'blue' },
				{ percentage: 5, color: 'cyan' },
				{ percentage: 20, color: 'yellow' },
				{ percentage: 15, color: 'black' },
			],
			loading: false,
		});
		expect(
			shallow(<ContainerPieChartButton state={initialState} />).getElement().props.loading,
		).toBeFalsy();
	});
});

describe('PieChartButton container', () => {
	it('should render', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'red' },
				{ percentage: 15, color: 'blue' },
				{ percentage: 5, color: 'cyan' },
				{ percentage: 20, color: 'yellow' },
				{ percentage: 15, color: 'black' },
			],
		});
		expect(
			shallow(<ContainerPieChartButton state={initialState} />).getElement(),
		).toMatchSnapshot();
	});
});

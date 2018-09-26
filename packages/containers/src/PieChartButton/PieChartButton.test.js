import React from 'react';
import Immutable from 'immutable';
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
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
			],
		});
		expect(
			shallow(<ContainerPieChartButton state={initialState} />).getElement(),
		).toMatchSnapshot();
	});

	it('should render not available pie chart button', () => {
		const initialState = Immutable.fromJS({
			model: [
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
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
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
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
				{ percentage: 10, color: 'rio-grande' },
				{ percentage: 15, color: 'chestnut-rose' },
				{ percentage: 5, color: 'lightning-yellow' },
				{ percentage: 20, color: 'dove-gray' },
				{ percentage: 15, color: 'silver-chalice' },
			],
		});
		expect(
			shallow(<ContainerPieChartButton state={initialState} />).getElement(),
		).toMatchSnapshot();
	});
});

import React from 'react';
import { shallow } from 'enzyme';

import QualityBar, { formatNumber } from './QualityBar.component';

function quality(total, percentage) {
	return {
		total,
		percentage,
	};
}

describe('#QualityBar', () => {
	it('should render QualityBar', () => {
		const wrapper = shallow(
			<QualityBar invalid={quality(999, 32)} empty={quality(1000, 33)} valid={quality(1001, 35)} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render QualityBar without invalid value', () => {
		const wrapper = shallow(
			<QualityBar invalid={quality(0, 0)} empty={quality(1000, 49)} valid={quality(1001, 51)} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render QualityBar without empty value', () => {
		const wrapper = shallow(
			<QualityBar invalid={quality(1000, 49)} empty={quality(0, 0)} valid={quality(1001, 51)} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render QualityBar without valid value', () => {
		const wrapper = shallow(
			<QualityBar invalid={quality(1000, 49)} empty={quality(1001, 51)} valid={quality(0, 0)} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('#formatNumber', () => {
	it('should format like 1 000.00001', () => {
		expect(formatNumber(1000.00001)).toBe('1 000.00001');
	});
});

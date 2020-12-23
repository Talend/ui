import React from 'react';
import { mount } from 'enzyme';
import FixedBarSizeWrapper from './FixedHeightBarWrapper.component';

describe('Fixed height bar wrapper', () => {
	it('Should only show bars fitting in container', () => {
		const component = mount(
			<FixedBarSizeWrapper height={300} data={[...new Array(100)]}>
				<div data-test="content">Content</div>
			</FixedBarSizeWrapper>,
		);

		expect(component.find('[data-test="content"]').prop('data')).toHaveLength(10);
	});

	it('Should not grow to available size if not enough data provided', () => {
		const component = mount(
			<FixedBarSizeWrapper height={300} data={[...new Array(2)]}>
				<div data-test="content">Content</div>
			</FixedBarSizeWrapper>,
		);

		expect(component.find('[data-test="content"]').prop('height')).toEqual(90);
	});
});

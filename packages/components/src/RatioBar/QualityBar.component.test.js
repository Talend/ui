import React from 'react';
import { mount } from 'enzyme';
import { QualityBar } from './QualityBar.component';

describe('QualityBar', () => {
	describe('QualityBar component', () => {
		it('should render', () => {
			// given
			const t = (key, value) => value.defaultValue;
			// when
			const wrapper = mount(
				<QualityBar>
					<QualityBar.ValidLine value={10} percentage={60} t={t} />
					<QualityBar.EmptyLine value={10} percentage={50} t={t} />
					<QualityBar.InvalidLine value={10} percentage={30} t={t} />
				</QualityBar>,
			);
			// then
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});

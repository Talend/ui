import React from 'react';
import { shallow, mount } from 'enzyme';
import { QualityBar } from './QualityBar.component';

describe('QualityBar', () => {
	describe('QualityBar component', () => {
		it('should render a chart', () => {
			// given
			const props = {
				valid: 523,
				invalid: 123,
				empty: 332,
			};
			// when
			const wrapper = shallow(<QualityBar {...props} />);
			// then
			expect(wrapper.find('QualityInvalidLine').props().percentage).toBe(12.6);
			expect(wrapper.find('QualityInvalidLine').props().value).toBe(123);
			expect(wrapper.find('QualityEmptyLine').props().percentage).toBe(33.9);
			expect(wrapper.find('QualityEmptyLine').props().value).toBe(332);
			expect(wrapper.find('QualityValidLine').props().percentage).toBe(53.5);
			expect(wrapper.find('QualityValidLine').props().value).toBe(523);
		});
		it('should render a chart with not applicable', () => {
			// given
			const props = {
				valid: 523,
				invalid: 123,
				empty: 332,
				na: 100,
			};
			// when
			const wrapper = shallow(<QualityBar {...props} />);
			// then
			expect(wrapper.find('QualityInvalidLine').props().percentage).toBe(11.4);
			expect(wrapper.find('QualityInvalidLine').props().value).toBe(123);
			expect(wrapper.find('QualityEmptyLine').props().percentage).toBe(30.8);
			expect(wrapper.find('QualityEmptyLine').props().value).toBe(332);
			expect(wrapper.find('QualityValidLine').props().percentage).toBe(48.5);
			expect(wrapper.find('QualityValidLine').props().value).toBe(523);
			expect(wrapper.find('QualityNotApplicableLine').props().percentage).toBe(9.3);
			expect(wrapper.find('QualityNotApplicableLine').props().value).toBe(100);
		});
		it('should render an chart with action button', () => {
			// given
			const mockFunctionAction = jest.fn();
			const props = {
				valid: 523,
				invalid: 123,
				empty: 332,
				na: 100,
				onClick: mockFunctionAction,
				getDataFeature: qualityType => {
					return `data-feature-${qualityType}`;
				},
			};
			// when
			const wrapper = mount(<QualityBar {...props} />);
			wrapper
				.find('div')
				.filterWhere(item => {
					return item.prop('data-feature') === 'data-feature-valid';
				})
				.simulate('click');
			// then
			expect(mockFunctionAction).toHaveBeenCalled();
			expect(
				wrapper.find('div').filterWhere(item => {
					return item.prop('data-feature') === 'data-feature-valid';
				}).length,
			).toBe(1);
			expect(
				wrapper.find('div').filterWhere(item => {
					return item.prop('data-feature') === 'data-feature-invalid';
				}).length,
			).toBe(1);
			expect(
				wrapper.find('div').filterWhere(item => {
					return item.prop('data-feature') === 'data-feature-empty';
				}).length,
			).toBe(1);
			expect(
				wrapper.find('div').filterWhere(item => {
					return item.prop('data-feature') === 'data-feature-na';
				}).length,
			).toBe(1);
		});
	});
});

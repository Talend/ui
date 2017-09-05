import React from 'react';
import renderer from 'react-test-renderer';

import Badge from './Badge.component';

jest.mock('react-dom');

describe('Badge', () => {
	it('should render Badge without icon in outline style', () => {
		// given
		const props = {
			label: 'Label 1',
			tcStyle: 'outline',
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render Badge with icon in outline style', () => {
		// given
		const props = {
			label: 'Label 1',
			tcStyle: 'outline',
			onDelete: () => {},
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render Badge without icon in solid style', () => {
		// given
		const props = {
			label: 'Label 1',
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render Badge with icon in solid style', () => {
		// given
		const props = {
			label: 'Label 1',
			onDelete: () => {},
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
});

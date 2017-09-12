import React from 'react';
import renderer from 'react-test-renderer';

import Badge from './Badge.component';

describe('Engine', () => {
	it('should render Badge', () => {
		// given
		const props = {
			label: 'Label',
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render Badge with delete icon', () => {
		// given
		const props = {
			label: 'Label',
			onDelete: () => {},
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render selected Badge with delete icon', () => {
		// given
		const props = {
			label: 'Label',
			selected: true,
			onDelete: () => {},
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render disabled Badge with delete icon', () => {
		// given
		const props = {
			label: 'Label',
			disabled: true,
			onDelete: () => {},
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render Badge with category and delete icon', () => {
		// given
		const props = {
			label: 'Label',
			category: 'Category',
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

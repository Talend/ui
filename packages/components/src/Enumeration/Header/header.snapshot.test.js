import React from 'react';
import renderer from 'react-test-renderer';


import Header from './Header.component';

describe('Header', () => {
	it('should render header with one dropdown and two items', () => {
		// given
		const props = {
			label: 'Values',
			headerDefault: [{
				displayMode: 'dropdown',
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // provided click callback
				items: [{
					label: 'Add values from a file',
					id: 'append-uploding',
					onClick: jest.fn(),
				}, {
					label: 'Overwrite existing values',
					id: 'append-uploding',
					onClick: jest.fn(),
				}],
			}],
		};

		// when
		const wrapper = renderer.create(
			<Header {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render header with one button', () => {
		// given
		const props = {
			label: 'Values',
			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // provided click callback
			}],
		};

		// when
		const wrapper = renderer.create(
			<Header {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render header with one button and indicate the component is required', () => {
		// given
		const props = {
			label: 'Values',
			required: true,
			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // provided click callback
			}],
		};

		// when
		const wrapper = renderer.create(
			<Header {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});

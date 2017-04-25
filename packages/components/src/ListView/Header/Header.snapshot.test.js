import React from 'react';
import renderer from 'react-test-renderer';


import Header from './Header.component';

describe('Header', () => {
	it('should render header with one button', () => {
		// given
		const props = {
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

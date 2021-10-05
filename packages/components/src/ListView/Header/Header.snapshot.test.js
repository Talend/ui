import React from 'react';
import renderer from 'react-test-renderer';


import Header from './Header.component';

describe('Header', () => {
	it('should render header with one button', () => {
		// given
		const props = {
			headerDefault: [{
				disabled: false,
				label: 'Search for specific values',
				icon: 'talend-search',
				id: 'search',
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

import React from 'react';
import renderer from 'react-test-renderer';

import Actions from './Actions.component';

jest.mock('react-dom');

describe('Actions', () => {
	it('should render buttons', () => {
		const actions = [
			{
				label: 'Preparations',
				icon: 'fa fa-asterisk',
				onClick: jest.fn(),
				bsStyle: 'primary',
			},
			{
				label: 'Datasets',
				icon: 'fa fa-file-excel-o',
				onClick: jest.fn(),
			},
			{
				label: 'Favorites',
				icon: 'fa fa-star',
				onClick: jest.fn(),
			},
		];
		const wrapper = renderer.create(<Actions actions={actions} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

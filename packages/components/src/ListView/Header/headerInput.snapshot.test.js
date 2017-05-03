import React from 'react';
import renderer from 'react-test-renderer';


import HeaderInput from './HeaderInput.component';

describe('Header', () => {
	it('should render filter header', () => {
		// given
		const props = {
			inputPlaceholder: 'Search',
			headerInput: [
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(), // provided click callback
				},
			],
		};

		function createNodeMock(element) {
			if (element.type === 'input') {
				return {};
			}
			return null;
		}

		const rendererOptions = { createNodeMock };

		// when
		const wrapper = renderer.create(
			<HeaderInput {...props} />,
			rendererOptions
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});

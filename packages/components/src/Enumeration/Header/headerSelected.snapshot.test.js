import React from 'react';
import renderer from 'react-test-renderer';

import HeaderSelected from './HeaderSelected.component';

describe('Header', () => {
	it('should render header with trash icon in case of multiple selection', () => {
		// given
		const props = {
			headerSelected: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // provided click callback
			}],
			nbItemsSelected: 2,
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
			<HeaderSelected {...props} />,
			rendererOptions
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render header in selected state without trash icon in case of single selection)', () => {
		// given
		const props = {
			headerSelected: [],
			nbItemsSelected: 1,
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
			<HeaderSelected {...props} />,
			rendererOptions
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});

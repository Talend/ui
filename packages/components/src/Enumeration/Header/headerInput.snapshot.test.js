import React from 'react';
import renderer from 'react-test-renderer';


import HeaderInput from './HeaderInput.component';

describe('Header', () => {
	it('should render header input with two buttons', () => {
		// given
		const props = {
			inputPlaceholder: 'New entry',
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // provided click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // provided click callback
			}],
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

	it('should render header input with error', () => {
		// given
		const props = {
			inputPlaceholder: 'New entry',
			headerError: 'duplicate value',
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // provided click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // provided click callback
			}],
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

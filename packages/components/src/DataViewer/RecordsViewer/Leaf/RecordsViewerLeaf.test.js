import { screen, render } from '@testing-library/react';
import Component from './RecordsViewerLeaf.component';
jest.unmock('@talend/design-system');

describe('Component', () => {
	beforeEach(() => {
		Object.defineProperties(window.HTMLElement.prototype, {
			offsetParent: {
				get() {
					return {
						offsetWith: parseFloat(this.style.width) || 0,
					};
				},
			},
		});
	});
	it('should render the leaf', () => {
		const props = {
			measure: jest.fn(),
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
		};
		const { container } = render(<Component {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render the leaf highlighted', () => {
		const props = {
			measure: jest.fn(),
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			nodeHighlighted: true,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
		};
		const { container } = render(<Component {...props} />);
		expect(container.firstChild).toHaveClass('tc-records-viewer-leaf-highlighted');
	});
	it('should render the leaf with additional value', () => {
		const props = {
			measure: jest.fn(),
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
			renderLeafAdditionalValue: value => (
				<div>Additional render for what you want, you can use the value : {value.data.value}</div>
			),
		};
		render(<Component {...props} />);
		expect(
			screen.getByText('Additional render for what you want, you can use the value : myValue'),
		).toBeVisible();
	});
});

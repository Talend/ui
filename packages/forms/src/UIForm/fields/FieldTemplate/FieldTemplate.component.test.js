import { screen, render } from '@testing-library/react';

import FieldTemplate from './FieldTemplate.component';

jest.unmock('@talend/design-system');
jest.mock('ally.js');

describe('FieldTemplate', () => {
	const defaultProps = {
		isValid: true,
		description: 'My awesome description',
		descriptionId: 'myAwesomeField-description',
		errorId: 'myAwesomeField-error',
		errorMessage: 'This is wrong o_o',
		id: 'myAwesomeField',
		label: 'My awesome label',
	};

	it('should render', () => {
		// when
		const { container } = render(
			<FieldTemplate {...defaultProps}>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		const input = screen.getByRole('textbox');
		const label = screen.getByText('My awesome label');
		expect(label.nextSibling).toBe(input);
	});

	it('should render with label after', () => {
		// when
		render(
			<FieldTemplate {...defaultProps} labelAfter>
				<input type="text" id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		const input = screen.getByRole('textbox');
		const label = screen.getByText('My awesome label');
		expect(input.nextSibling).toBe(label);
	});

	it('should render with hint', () => {
		const tooltipContent = <span>Tooltip content</span>;

		// when
		render(
			<FieldTemplate
				{...defaultProps}
				hint={{
					overlayComponent: tooltipContent,
					overlayPlacement: 'top',
				}}
			>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(screen.getByText('Tooltip content')).toBeInTheDocument();
	});

	it('should render invalid className', () => {
		// when
		const { container } = render(
			<FieldTemplate {...defaultProps} isValid={false}>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(container.firstChild).toHaveClass('has-error');
	});

	it('should add animation on value with updating status', () => {
		// when
		const { container } = render(
			<FieldTemplate {...defaultProps} isValid={false} valueIsUpdating>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
		expect(container.firstChild).toHaveClass('theme-updating');
	});

	it('should pass label props to the label', () => {
		// when
		render(
			<FieldTemplate {...defaultProps} labelProps={{ className: 'custom-label-class' }}>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(screen.getByText('My awesome label')).toHaveClass('custom-label-class');
	});
});

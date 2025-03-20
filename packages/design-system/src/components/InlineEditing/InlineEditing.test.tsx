/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { InlineEditing } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
		getDataAttrFromProps: () => ({ 'data-tracking': 'test-tracker' }),
	};
});

describe('InlineEditing', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<InlineEditing
					label="Edit the value"
					placeholder="What is your Lorem Ipsum?"
					defaultValue="Lorem Ipsum"
					onEdit={jest.fn()}
				/>
			</main>,
		);

		fireEvent.click(screen.getByTestId('inlineediting.button.edit'));
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});

	it('should render with data-testid prefix', async () => {
		render(
			<main>
				<InlineEditing
					label="Edit the value"
					placeholder="What is your Lorem Ipsum?"
					defaultValue="Lorem Ipsum"
					onEdit={jest.fn()}
					data-testid="my-prefix"
				/>
			</main>,
		);

		expect(screen.getByTestId('my-prefix.inlineediting.button.edit')).toBeInTheDocument();
	});

	it('should not allow to submit required input', async () => {
		const onEdit = jest.fn();
		render(
			<main>
				<InlineEditing
					label="Edit the value"
					placeholder="What is your Lorem Ipsum?"
					defaultValue=""
					onEdit={onEdit}
					required
				/>
			</main>,
		);

		fireEvent.click(screen.getByTestId('inlineediting.button.edit'));

		expect(
			screen.getByRole('button', {
				name: /submit/i,
			}),
		).toBeDisabled();

		fireEvent.keyDown(
			screen.getByRole('textbox', {
				name: /edit the value\*/i,
			}),
			'Enter',
		);
		expect(onEdit).not.toHaveBeenCalled();
	});
});

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
});

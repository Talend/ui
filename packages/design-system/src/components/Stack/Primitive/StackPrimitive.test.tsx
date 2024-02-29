import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import StackPrimitive from './StackPrimitive';

describe('StackPrimitive', () => {
	it('Should render with data-test attributes', async () => {
		render(
			<StackPrimitive
				data-test="my-stack"
				data-testid="my-stack-testid"
				data-feature="my-stack-feature"
				gap={0}
			>
				text
			</StackPrimitive>,
		);

		const stack = screen.getByTestId('my-stack-testid');
		expect(stack).toBeInTheDocument();

		expect(stack).toHaveAttribute('data-test', 'my-stack');
		expect(stack).toHaveAttribute('data-feature', 'my-stack-feature');
	});
});

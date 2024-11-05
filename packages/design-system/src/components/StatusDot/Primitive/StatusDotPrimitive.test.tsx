import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import StatusDot, { variants } from './StatusDotPrimitive';

describe('StatusDot', (): void => {
	it('Should render', (): void => {
		render(<StatusDot variant={variants.success} data-testid="my-status-dot-component" />);

		expect(screen.getByTestId('my-status-dot-component')).toBeVisible();
	});
});

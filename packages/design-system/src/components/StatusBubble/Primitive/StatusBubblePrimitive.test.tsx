import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import StatusBubble, { variants } from './StatusBubblePrimitive';

describe('StatusBubble', (): void => {
	it('Should render', (): void => {
		render(<StatusBubble variant={variants.success} data-testid="my-status-bubble-component" />);

		expect(screen.getByTestId('my-status-bubble-component')).toBeVisible();
	});
});

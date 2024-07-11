/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Status from './StatusPrimitive';

describe('Status', () => {
	it('Should render', async () => {
		render(
			<Status data-testid="my-status-component" variant="successful">
				This is my status
			</Status>,
		);

		expect(screen.getByTestId('my-status-component')).toBeInTheDocument();
		expect(screen.getByText('This is my status')).toBeInTheDocument();
	});
});

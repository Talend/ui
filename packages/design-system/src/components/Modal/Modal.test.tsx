/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Modal } from './';

describe('Message', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Modal visible header={{ title: '(Default story title)' }} onClose={() => jest.fn()}>
					Content
				</Modal>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});

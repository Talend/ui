/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { MessageSuccess, MessageDestructive, MessageWarning, MessageInformation } from './';

describe('Message', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<MessageSuccess
					title="All good"
					description="This component is well configured"
					link={{ href: 'https://talend.com', children: 'Learn more' }}
					action={{ children: 'See', onClick: jest.fn() }}
				>
					Success
				</MessageSuccess>
				<MessageDestructive
					title="Something went wrong"
					description="There is an issue with the component configuration"
					link={{ href: 'https://talend.com', children: 'Learn more' }}
					action={{ children: 'See', onClick: jest.fn() }}
				>
					Destructive
				</MessageDestructive>
				<MessageWarning
					title="Type incompatibilities"
					description="Maybe resolve this issue before doing anything else"
					link={{ href: 'https://talend.com', children: 'Learn more' }}
					action={{ children: 'See', onClick: jest.fn() }}
				>
					Warning
				</MessageWarning>
				<MessageInformation
					title="Auto mapping"
					description="Some fields has been auto mapped"
					link={{ href: 'https://talend.com', children: 'Learn more' }}
					action={{ children: 'Dismiss', onClick: jest.fn() }}
				>
					Information
				</MessageInformation>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('button')?.click();
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});

import React from 'react';
import Link from '.';
import { render, screen } from '../../../test-utils';

describe('Link', () => {
	test('default', () => {
		render(<Link data-testid="my.link">Link</Link>);
		const link = screen.getByTestId('my.link');
		expect(link).toHaveClass('link');
	});

	test('iconBefore', () => {
		render(
			<Link data-testid="my.link" iconBefore="talend-stop">
				Link
			</Link>,
		);
		const linkIconBefore = screen.getByTestId('link.icon.before');
		expect(linkIconBefore).toBeInTheDocument();
	});

	test('iconAfter', () => {
		render(
			<Link data-testid="my.link" iconAfter="talend-stop">
				Link
			</Link>,
		);
		const linkIconAfter = screen.getByTestId('link.icon.after');
		expect(linkIconAfter).toBeInTheDocument();
	});

	test('disabled', () => {
		render(
			<Link data-testid="my.link" disabled>
				Link
			</Link>,
		);
		const link = screen.getByTestId('my.link');
		expect(link).toHaveClass('link--disabled');
	});

	test('external', () => {
		render(
			<Link data-testid="my.link" href="https://www.talend.com">
				Link
			</Link>,
		);
		const link = screen.getByTestId('my.link');
		const linkIcon = link.querySelector('.link__icon');
		expect(linkIcon).toHaveClass('link__icon--external');
	});

	test('target blank', () => {
		render(
			<Link data-testid="my.link" target="_blank">
				Link
			</Link>,
		);
		const link = screen.getByTestId('my.link');
		expect(link).toHaveAttribute('title', 'Open in a new tab');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	test('target unknown', () => {
		render(
			<Link data-testid="my.link" target="unknown">
				Link
			</Link>,
		);
		const link = screen.getByTestId('my.link');
		expect(link).toHaveAttribute('title', 'Open in a new tab');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	test('target self', () => {
		render(
			<Link data-testid="my.link" target="_self">
				Link
			</Link>,
		);
		const link = screen.getByTestId('my.link');
		expect(link).not.toHaveAttribute('title');
		expect(link).not.toHaveAttribute('rel');
	});

	test('data-feature', () => {
		render(
			<Link data-testid="my.link" data-feature="my.feature">
				Feature
			</Link>,
		);
		const link = screen.getByTestId('my.link');
		expect(link).toHaveAttribute('data-feature', 'my.feature');
	});
});

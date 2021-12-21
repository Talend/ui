import React from 'react';
import Link from '.';
import { render } from '../../../test-utils';

describe('Link', () => {
	test('default', () => {
		const { getByTestId } = render(<Link data-testid="my.link">Link</Link>);
		const link = getByTestId('my.link');
		expect(link.classList.contains('link')).toBeTruthy();
	});

	test('iconBefore', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" iconBefore="talend-stop">
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.querySelector('.link__icon').classList.contains('link__icon--before')).toBeTruthy();
	});

	test('iconAfter', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" iconAfter="talend-stop">
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.querySelector('.link__icon').classList.contains('link__icon--after')).toBeTruthy();
	});

	test('disabled', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" disabled>
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.classList.contains('link--disabled')).toBeTruthy();
	});

	test('external', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" href="https://www.talend.com">
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(
			link.querySelector('.link__icon').classList.contains('link__icon--external'),
		).toBeTruthy();
	});

	test('target blank', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" target="_blank">
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.getAttribute('title')).toBe('Open in a new tab');
		expect(link.getAttribute('rel')).toBe('noopener noreferrer');
	});

	test('target unknown', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" target="unknown">
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.getAttribute('title')).toBe('Open in a new tab');
		expect(link.getAttribute('rel')).toBe('noopener noreferrer');
	});

	test('target self', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" target="_self">
				Link
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.getAttribute('title')).toBeNull();
		expect(link.getAttribute('rel')).toBeNull();
	});

	test('data-feature', () => {
		const { getByTestId } = render(
			<Link data-testid="my.link" data-feature="my.feature">
				Feature
			</Link>,
		);
		const link = getByTestId('my.link');
		expect(link.getAttribute('data-feature')).toBe('my.feature');
	});
});

import React from 'react';
import { render } from '../../../test-utils';
import Button from '.';

describe('Button', () => {
	test('default', () => {
		const { getByTestId } = render(<Button data-testid="my.button">Button</Button>);
		const button = getByTestId('my.button');
		expect(button.classList.contains('btn')).toBeTruthy();
	});

	describe('variations', () => {
		test('primary', () => {
			const { getByTestId } = render(
				<Button.Primary data-testid="my.button">Button</Button.Primary>,
			);
			const button = getByTestId('my.button');
			expect(button.classList.contains('btn--primary')).toBeTruthy();
		});
		test('destructive', () => {
			const { getByTestId } = render(
				<Button.Destructive data-testid="my.button">Button</Button.Destructive>,
			);
			const button = getByTestId('my.button');
			expect(button.classList.contains('btn--destructive')).toBeTruthy();
		});
		test('secondary', () => {
			const { getByTestId } = render(
				<Button.Secondary data-testid="my.button">Button</Button.Secondary>,
			);
			const button = getByTestId('my.button');
			expect(button.classList.contains('btn--secondary')).toBeTruthy();
		});
		test('tertiary', () => {
			const { getByTestId } = render(
				<Button.Tertiary data-testid="my.button">Button</Button.Tertiary>,
			);
			const button = getByTestId('my.button');
			expect(button.classList.contains('btn--tertiary')).toBeTruthy();
		});
		test('icon', () => {
			const { getByTestId } = render(<Button.Icon data-testid="my.button">Button</Button.Icon>);
			const button = getByTestId('my.button');
			expect(button.classList.contains('btn--icon')).toBeTruthy();
		});
	});

	test('loading', () => {
		const { getByTestId } = render(
			<Button data-testid="my.button" loading>
				Button
			</Button>,
		);
		const button = getByTestId('my.button');
		expect(button.classList.contains('btn--loading')).toBeTruthy();
	});

	test('small', () => {
		const { getByTestId } = render(
			<Button data-testid="my.button" small>
				Button
			</Button>,
		);
		const button = getByTestId('my.button');
		expect(button.classList.contains('btn--small')).toBeTruthy();
	});

	test('icon', () => {
		const { getByTestId } = render(
			<Button data-testid="my.button" icon="talend">
				Button
			</Button>,
		);
		const button = getByTestId('my.button');
		expect(button.classList.contains('btn--has-icon')).toBeTruthy();
	});

	test('data-feature', () => {
		const { getByTestId } = render(
			<Button data-testid="my.button" data-feature="my.feature">
				Feature
			</Button>,
		);
		const button = getByTestId('my.button');
		expect(button.getAttribute('data-feature')).toBe('my.feature');
	});
});

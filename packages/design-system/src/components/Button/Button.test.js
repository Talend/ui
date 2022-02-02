import React from 'react';
import { render, screen } from '../../../test-utils';
import Button from '.';

describe('Button', () => {
	test('default', () => {
		render(<Button data-testid="my.button">Button</Button>);
		const button = screen.getByTestId('my.button');
		expect(button).toHaveClass('btn');
	});

	describe('variations', () => {
		test('primary', () => {
			render(<Button.Primary data-testid="my.button">Button</Button.Primary>);
			const button = screen.getByTestId('my.button');
			expect(button).toHaveClass('btn--primary');
		});
		test('destructive', () => {
			render(<Button.Destructive data-testid="my.button">Button</Button.Destructive>);
			const button = screen.getByTestId('my.button');
			expect(button).toHaveClass('btn--destructive');
		});
		test('secondary', () => {
			render(<Button.Secondary data-testid="my.button">Button</Button.Secondary>);
			const button = screen.getByTestId('my.button');
			expect(button).toHaveClass('btn--secondary');
		});
		test('tertiary', () => {
			render(<Button.Tertiary data-testid="my.button">Button</Button.Tertiary>);
			const button = screen.getByTestId('my.button');
			expect(button).toHaveClass('btn--tertiary');
		});
		test('icon', () => {
			render(<Button.Icon data-testid="my.button">Button</Button.Icon>);
			const button = screen.getByTestId('my.button');
			expect(button).toHaveClass('btn--icon');
		});
	});

	test('loading', () => {
		render(
			<Button data-testid="my.button" loading>
				Button
			</Button>,
		);
		const button = screen.getByTestId('my.button');
		expect(button).toHaveClass('btn--loading');
	});

	test('small', () => {
		render(
			<Button data-testid="my.button" small>
				Button
			</Button>,
		);
		const button = screen.getByTestId('my.button');
		expect(button).toHaveClass('btn--small');
	});

	test('icon', () => {
		render(
			<Button data-testid="my.button" icon="talend-logo">
				Button
			</Button>,
		);
		const button = screen.getByTestId('my.button');
		expect(button).toHaveClass('btn--has-icon');
	});

	test('data-feature', () => {
		render(
			<Button data-testid="my.button" data-feature="my.feature">
				Feature
			</Button>,
		);
		const button = screen.getByTestId('my.button');
		expect(button).toHaveAttribute('data-feature', 'my.feature');
	});
});

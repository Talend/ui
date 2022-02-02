import React from 'react';
import { render, screen } from '../../../test-utils';
import { IconsProvider } from './index';

describe('IconsProvider', () => {
	test('should match snapshot', () => {
		const { container } = render(<IconsProvider bundles={[]} />);
		expect(container).toMatchSnapshot();
	});

	test('should prevent multiple instance creation', () => {
		const { container } = render(
			<>
				<IconsProvider bundles={[]} />
				<IconsProvider bundles={[]} />
			</>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render default custom icons defined on icons prop', () => {
		const customIcons = {
			custom: <svg />,
		};
		render(
			<div data-testid="wrapper">
				<IconsProvider bundles={[]} icons={customIcons} />
			</div>,
		);
		const wrapper = screen.getByTestId('wrapper');
		const symbols = wrapper.querySelectorAll('symbol');
		expect(symbols.length).toBe(1);
		expect(symbols[0].id).toBe('custom');
	});

	it('should support defaultIcons props', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		render(
			<div data-testid="wrapper">
				<IconsProvider bundles={[]} defaultIcons={defaultIcons} />
			</div>,
		);
		const wrapper = screen.getByTestId('wrapper');
		const symbols = wrapper.querySelectorAll('symbol');
		expect(symbols.length).toBe(1);
		expect(symbols[0].id).toBe('default');
	});

	it('should support defaultIcons props and render custom icon', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const customIcons = {
			custom: <svg id="customIcon" />,
		};
		render(
			<div data-testid="wrapper">
				<IconsProvider bundles={[]} defaultIcons={defaultIcons} icons={customIcons} />
			</div>,
		);
		const wrapper = screen.getByTestId('wrapper');
		const symbols = wrapper.querySelectorAll('symbol');
		expect(symbols.length).toBe(2);
	});
});

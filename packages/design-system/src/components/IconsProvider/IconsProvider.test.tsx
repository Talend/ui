import React from 'react';
import { render } from '../../../test-utils';
import { IconsProvider } from './index';

describe('IconsProvider', () => {
	test('should match snapshot', () => {
		const { container } = render(<IconsProvider />);
		expect(container).toMatchSnapshot();
	});

	test('should prevent multiple instance creation', () => {
		const { container } = render(
			<>
				<IconsProvider />
				<IconsProvider />
			</>
		);
		expect(container).toMatchSnapshot();
	});

	it('should render default custom icons defined on icons prop', () => {
		const customIcons = {
			custom: <svg />,
		};
		const { container } = render(<IconsProvider icons={customIcons} />);
		const symbols = container.querySelectorAll('symbol');
		expect(symbols.length).toBe(1);
		expect(symbols[ 0 ].id).toBe('custom');
	});

	it('should support defaultIcons props', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const { container } = render(<IconsProvider defaultIcons={defaultIcons} />);
		const symbols = container.querySelectorAll('symbol');
		expect(symbols.length).toBe(1);
		expect(symbols[ 0 ].id).toBe('default');
	});

	it('should support defaultIcons props and render custom icon', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const customIcons = {
			custom: <svg id="customIcon" />,
		};
		const { container } = render(<IconsProvider defaultIcons={defaultIcons} icons={customIcons} />);
		const symbols = container.querySelectorAll('symbol');
		expect(symbols.length).toBe(2);
	});
});

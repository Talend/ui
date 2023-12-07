// rewrite tests using react-testing-library
import { fireEvent, render, screen } from '@testing-library/react';

import getDefaultT from '../../../translate';
import { BadgeOverlay } from './BadgeOverlay.component';

describe('BadgeOverlay', () => {
	it('should render the html output in the default state', () => {
		// Given
		const props = {
			id: 'my-id',
			label: 'my label',
			t: getDefaultT(),
		};
		// When
		const { container } = render(<BadgeOverlay {...props}>{jest.fn()}</BadgeOverlay>);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render the html output with children as function', async () => {
		// Given
		const childrenAsFunc = () => <div data-testid="my-children">hello world</div>;
		const props = {
			id: 'my-id',
			label: 'my label',
			t: getDefaultT(),
		};
		// When
		render(<BadgeOverlay {...props}>{childrenAsFunc}</BadgeOverlay>);
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryByTestId('my-children')).toBeNull();
		fireEvent.click(screen.getByText('my label'));
		await screen.findByRole('dialog');
		// Then
		expect(screen.getByTestId('my-children')).toHaveTextContent('hello world');
	});
	it('should trigger a callback when button clicked', async () => {
		// Given
		const childrenAsFunc = () => <div data-testid="my-children">hello world</div>;
		const onChange = jest.fn();
		const props = {
			label: 'my label',
			id: 'my-id',
			t: getDefaultT(),
			onChange,
		};
		// When
		render(<BadgeOverlay {...props}>{childrenAsFunc}</BadgeOverlay>);

		fireEvent.click(screen.getByText(props.label));
		// Then
		expect(onChange.mock.calls.length).toBe(1);
		expect(onChange.mock.calls[0][1]).toBe(true);
	});
	it('should render with the overlay showed', () => {
		// Given
		const props = {
			label: 'my label',
			id: 'my-id',
			initialOpened: true,
			t: getDefaultT(),
		};
		// When
		render(
			<BadgeOverlay {...props}>
				{jest.fn(() => (
					<div>Foo</div>
				))}
			</BadgeOverlay>,
		);
		// Then
		expect(screen.getByText('Foo')).toBeInTheDocument();
	});
});

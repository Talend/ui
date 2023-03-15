import React from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrap from './wrap';

describe('wrap', () => {
	const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
		<button onClick={onClick}>{children}</button>
	);
	Button.displayName = 'Button';
	Button.foo = 'bar';
	it('should create a component', () => {
		const WrappedButton = wrap(Button, 'MyButton');
		expect(WrappedButton.displayName).toBe('MyButton');
		const onClick = jest.fn();
		render(<WrappedButton text="hello" onClick={onClick} />);
		expect(screen.getByText('hello')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		userEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalled();
	});

	it('should re-expose all attributes', () => {
		const WrappedButton = wrap(Button, 'MyButton');
		expect(WrappedButton.foo).toBe('bar');
		expect(WrappedButton.childContextTypes).toBeUndefined();
	});
});

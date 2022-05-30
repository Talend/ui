import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CloseButton from './CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    // when
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);

    // then
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should have type=button by default', () => {
    // when
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);

    // then
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('Should have class=close by default', () => {
    // when
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);

    // then
    expect(screen.getByRole('button')).toHaveClass('close');
  });

  it('Should call onClick callback', () => {
    // given
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);
    expect(onClick).not.toHaveBeenCalled();

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(onClick).toHaveBeenCalled();
  });

  it('Should have a span with aria-hidden=true', () => {
    // when
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);

    // then
    expect(screen.getByText('×')).toHaveAttribute('aria-hidden', 'true');
  });

  it('Should have a span with class=sr-only', () => {
    // when
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);

    // then
    expect(screen.getByText('Close')).toHaveClass('sr-only');
  });

  it('Should have a span with the custom text of the label', () => {
    // when
    const onClick = jest.fn();
    const label = 'Close Item';
    render(<CloseButton onClick={onClick} label={label} />);

    // then
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

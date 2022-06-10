import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('<Button>', () => {
  it('Should output a button', () => {
    // when
    render(<Button>Title</Button>);

    // then
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should have type=button by default', () => {
    // when
    render(<Button>Title</Button>);

    // then
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('Should show the type if passed one', () => {
    // when
    render(<Button type="submit">Title</Button>);

    // then
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('Should output an anchor if called with a href', () => {
    // when
    const href = '/url';
    render(<Button href={href}>Title</Button>);

    // then
    expect(screen.getByRole('link')).toHaveAttribute('href', href);
  });

  it('Should call onClick callback', () => {
    // given
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Title</Button>);

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(onClick).toHaveBeenCalled();
  });

  it('Should be disabled', () => {
    // when
    render(<Button disabled>Title</Button>);

    // then
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Should be disabled link', () => {
    // when
    render(
      <Button disabled href="#">
        Title
      </Button>
    );

    // then
    const link = screen.getByRole('button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveClass('disabled');
  });

  it('Should have block class', () => {
    // when
    render(<Button block>Title</Button>);

    // then
    expect(screen.getByRole('button')).toHaveClass('btn-block');
  });

  it('Should apply bsStyle class', () => {
    // when
    render(<Button bsStyle="danger">Title</Button>);

    // then
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    // when
    render(
      <Button className="bob" bsStyle="danger">
        Title
      </Button>
    );

    // then
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
    expect(screen.getByRole('button')).toHaveClass('bob');
  });

  it('Should default to bsStyle="default"', () => {
    // when
    render(<Button bsStyle="default">Title</Button>);

    // then
    expect(screen.getByRole('button')).toHaveClass('btn-default');
  });

  it('Should be active', () => {
    // when
    render(<Button active>Title</Button>);

    // then
    expect(screen.getByRole('button')).toHaveClass('active');
  });
});

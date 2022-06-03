import React from 'react';
import { render, screen } from '@testing-library/react';

import Breadcrumb from './Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', () => {
    // when
    render(<Breadcrumb id="custom-id" />);

    // then
    expect(screen.getByRole('navigation')).toHaveAttribute('id', 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    // when
    render(<Breadcrumb id="custom-id" />);

    // then
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb');
  });

  it('Should have custom classes', () => {
    // when
    render(<Breadcrumb className="custom-one custom-two" />);

    // then
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb');
    expect(screen.getByRole('navigation')).toHaveClass('custom-one');
    expect(screen.getByRole('navigation')).toHaveClass('custom-two');
  });

  it('Should have an aria-label in ol', () => {
    // when
    render(<Breadcrumb />);

    // then
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'breadcrumbs'
    );
  });
});

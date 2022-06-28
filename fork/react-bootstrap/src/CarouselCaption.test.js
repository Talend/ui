import React from 'react';
import { render, screen } from '@testing-library/react';

import Carousel from './Carousel';

describe('<Carousel.Caption>', () => {
  it('uses "div" by default', () => {
    // when
    render(<Carousel.Caption>Carousel.Caption content</Carousel.Caption>);

    // then
    const caption = screen.getByText('Carousel.Caption content');
    expect(caption).toBeInTheDocument();
    expect(caption.tagName).toBe('DIV');
  });

  it('has "carousel-caption" class', () => {
    // when
    render(<Carousel.Caption>Carousel.Caption content</Carousel.Caption>);

    // then
    const caption = screen.getByText('Carousel.Caption content');
    expect(caption).toHaveClass('carousel-caption');
  });

  it('Should merge additional classes passed in', () => {
    // when
    render(
      <Carousel.Caption className="bob">
        Carousel.Caption content
      </Carousel.Caption>
    );

    // then
    const caption = screen.getByText('Carousel.Caption content');
    expect(caption).toHaveClass('carousel-caption');
  });

  it('allows custom elements instead of "div"', () => {
    // given
    render(
      <Carousel.Caption componentClass="section">
        Carousel.Caption content
      </Carousel.Caption>
    );

    // then
    const caption = screen.getByText('Carousel.Caption content');
    expect(caption.tagName).toBe('SECTION');
  });
});

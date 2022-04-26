import React from 'react';
import { render, screen } from '@testing-library/react';

import Clearfix from './Clearfix';

describe('<Clearfix>', () => {
  it('uses "div" by default', () => {
    // when
    render(<Clearfix data-testid="test" />);

    // then
    expect(screen.getByTestId('test').tagName).toBe('DIV');
  });

  it('has "clearfix" class', () => {
    // when
    render(<Clearfix data-testid="test" />);

    // then
    expect(screen.getByTestId('test')).toHaveClass('clearfix');
  });

  it('Defaults to no visible block classes', () => {
    // when
    render(<Clearfix data-testid="test" />);

    // then
    const div = screen.getByTestId('test');
    expect(div).not.toHaveClass('visible-xs-block');
    expect(div).not.toHaveClass('visible-sm-block');
    expect(div).not.toHaveClass('visible-md-block');
    expect(div).not.toHaveClass('visible-lg-block');
  });

  it('Should apply visible block classes', () => {
    render(
      <Clearfix
        data-testid="test"
        visibleXsBlock
        visibleSmBlock
        visibleMdBlock
        visibleLgBlock
      />
    );

    // then
    const div = screen.getByTestId('test');
    expect(div).toHaveClass('visible-xs-block');
    expect(div).toHaveClass('visible-sm-block');
    expect(div).toHaveClass('visible-md-block');
    expect(div).toHaveClass('visible-lg-block');
  });

  it('Should merge additional classes passed in', () => {
    // when
    render(<Clearfix data-testid="test" className="bob" />);

    // then
    expect(screen.getByTestId('test')).toHaveClass('clearfix bob');
  });

  it('allows custom elements instead of "div"', () => {
    // when
    render(<Clearfix data-testid="test" componentClass="section" />);

    // then
    expect(screen.getByTestId('test').tagName).toBe('SECTION');
  });
});

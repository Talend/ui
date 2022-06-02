import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Breadcrumb from './Breadcrumb';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    // when
    render(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);

    // then
    const link = screen.getByRole('button');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).not.toHaveClass('active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    // when
    render(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);

    // then
    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass('active');
  });

  it('Should render `span.active` when active and has href', () => {
    // when
    render(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>
    );

    // then
    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass('active');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    // when
    render(
      <Breadcrumb.Item className="custom-one custom-two">
        Active Crumb
      </Breadcrumb.Item>
    );

    // then
    const item = screen.getByRole('listitem');
    expect(item).toHaveClass('custom-one');
    expect(item).toHaveClass('custom-two');
  });

  it('Should spread additional props onto inner element', () => {
    // given
    const handleClick = jest.fn();
    render(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>
    );

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(handleClick).toHaveBeenCalled();
  });

  it('Should apply id onto the anchor', () => {
    // when
    render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    // then
    expect(screen.getByRole('button')).toHaveAttribute('id', 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    // when
    render(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>
    );

    // then
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'http://getbootstrap.com/components/#breadcrumbs'
    );
  });

  it('Should apply `title` property onto `a` inner element', () => {
    // when
    render(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>
    );

    // then
    expect(screen.getByRole('link')).toHaveAttribute('title', 'test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    // when
    render(
      <Breadcrumb.Item title="test-title" href="/hi">
        Crumb
      </Breadcrumb.Item>
    );

    // then
    const listitem = screen.getByRole('listitem');
    expect(listitem).not.toHaveAttribute('title');
    expect(listitem).not.toHaveAttribute('href');
  });

  it('Should set `target` attribute on `anchor`', () => {
    // when
    render(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>
    );

    // then
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });
});

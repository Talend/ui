import React from 'react';
import { render, screen } from '@testing-library/react';

import Badge from './Badge';

describe('<Badge>', () => {
  it('Should output a badge with content', () => {
    // when
    render(
      <Badge>
        <strong>Content</strong>
      </Badge>
    );

    // then
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('Should have a badge class', () => {
    // when
    render(
      <Badge data-testid="test">
        <strong>Content</strong>
      </Badge>
    );

    // then
    expect(screen.getByTestId('test')).toHaveClass('badge');
  });

  it('Should have a badge class pulled right', () => {
    // when
    render(
      <Badge data-testid="test" pullRight>
        <strong>Content</strong>
      </Badge>
    );

    // then
    expect(screen.getByTestId('test')).toHaveClass('pull-right');
  });

  describe('Hides when empty', () => {
    it('should hide with no children', () => {
      // when
      render(<Badge data-testid="test" />);

      // then
      expect(screen.getByTestId('test')).toHaveClass('hidden');
    });

    it('should not hide 0', () => {
      // when
      render(<Badge data-testid="test">{0}</Badge>);

      // then
      expect(screen.getByTestId('test')).not.toHaveClass('hidden');
    });
  });
});

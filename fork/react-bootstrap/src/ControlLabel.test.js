import React from 'react';
import { render, screen } from '@testing-library/react';

import ControlLabel from './ControlLabel';
import FormGroup from './FormGroup';

describe('<ControlLabel>', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should render correctly', () => {
    // when
    render(
      <ControlLabel htmlFor="foo" className="my-control-label">
        Label
      </ControlLabel>
    );

    // then
    const label = screen.getByText('Label');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass('control-label');
    expect(label).toHaveClass('my-control-label');
    expect(label).toHaveAttribute('for', 'foo');
  });

  it('should respect srOnly', () => {
    // when
    render(<ControlLabel srOnly>Label</ControlLabel>);

    // then
    expect(screen.getByText('Label')).toHaveClass('sr-only');
  });

  it('should use controlId for htmlFor', () => {
    // when
    render(
      <FormGroup controlId="foo">
        <ControlLabel>Label</ControlLabel>
      </FormGroup>
    );

    // then
    expect(screen.getByText('Label')).toHaveAttribute('for', 'foo');
  });

  it('should prefer explicit htmlFor', () => {
    // when
    render(
      <FormGroup controlId="foo">
        <ControlLabel htmlFor="bar">Label</ControlLabel>
      </FormGroup>
    );

    // then
    expect(screen.getByText('Label')).toHaveAttribute('for', 'bar');
    expect(console.error).toBeCalledWith(
      'Warning: `controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.'
    );
  });
});

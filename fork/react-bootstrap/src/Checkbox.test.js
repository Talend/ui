import React from 'react';
import { render, screen } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('<Checkbox>', () => {
  it('should render correctly', () => {
    // when
    render(
      <Checkbox name="foo" checked className="my-checkbox">
        My label
      </Checkbox>
    );

    // then
    const checkbox = screen.getByRole('checkbox', { name: 'My label' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.parentElement.parentElement).toHaveClass('my-checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('name', 'foo');
  });

  it('should support inline', () => {
    // when
    render(
      <Checkbox inline name="foo" className="my-checkbox">
        My label
      </Checkbox>
    );

    // then
    const checkbox = screen.getByRole('checkbox', { name: 'My label' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.parentElement).toHaveClass('checkbox-inline');
  });

  it('should support validation state', () => {
    // when
    render(<Checkbox validationState="success" />);

    // then
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.parentElement.parentElement).toHaveClass('has-success');
  });

  it('should not support validation state when inline', () => {
    // given
    console.error = jest.fn();

    // when
    render(<Checkbox inline validationState="success" />);

    // then
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.parentElement.parentElement).not.toHaveClass('has-success');
    expect(console.error).toHaveBeenCalledWith(
      'Warning: `validationState` is ignored on `<Checkbox inline>`. To display validation state on an inline checkbox, set `validationState` on a parent `<FormGroup>` or other element instead.'
    );
  });

  it('should support inputRef', () => {
    // given
    let input;

    // when
    render(
      <Checkbox
        inputRef={(ref) => {
          input = ref;
        }}
      />
    );

    expect(input.tagName).toBe('INPUT');
  });
});

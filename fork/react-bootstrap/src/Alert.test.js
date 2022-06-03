import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Alert from './Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    // when
    render(
      <Alert>
        <strong>Message</strong>
      </Alert>
    );

    // then
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('Should have bsType by default', () => {
    // when
    render(
      <Alert>
        <strong>Message</strong>
      </Alert>
    );

    // then
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it('Should have dismissable style with onDismiss', () => {
    // when
    render(
      <Alert onDismiss={jest.fn()}>
        <strong>Message</strong>
      </Alert>
    );

    // then
    expect(screen.getByRole('alert')).toHaveClass('alert-dismissable');
  });

  it('Should call onDismiss callback on dismiss click', () => {
    // given
    const onDismiss = jest.fn();
    render(
      <Alert onDismiss={onDismiss} closeLabel="close">
        <strong>Message</strong>
      </Alert>
    );
    expect(onDismiss).not.toBeCalled();

    // when
    userEvent.click(screen.getByRole('button', { name: 'close' }));

    // then
    expect(onDismiss).toBeCalled();
  });

  it('Should have a default bsStyle class', () => {
    // when
    render(<Alert>Message</Alert>);

    // then
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it('Should have use bsStyle class', () => {
    // when
    render(<Alert bsStyle="danger">Message</Alert>);

    // then
    expect(screen.getByRole('alert')).toHaveClass('alert-danger');
  });

  describe('Web Accessibility', () => {
    it('Should call onDismiss callback when the sr-only dismiss link is activated', () => {
      // given
      const onDismiss = jest.fn();
      render(<Alert onDismiss={onDismiss}>Message</Alert>);
      expect(onDismiss).not.toBeCalled();

      // when
      userEvent.click(screen.getByRole('button', { name: 'Close alert' }));

      // then
      expect(onDismiss).toBeCalled();
    });
  });
});

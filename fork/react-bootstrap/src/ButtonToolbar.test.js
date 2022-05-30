import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import ButtonToolbar from './ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    // when
    render(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>Title</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );

    // then
    const buttonToolbar = screen.getByRole('toolbar');
    expect(buttonToolbar).toBeInTheDocument();
    expect(buttonToolbar).toHaveClass('btn-toolbar');
  });
});

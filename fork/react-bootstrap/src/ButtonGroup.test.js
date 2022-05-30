import React from 'react';
import { render, screen } from '@testing-library/react';

import ButtonGroup from './ButtonGroup';
import Button from './Button';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    // when
    render(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>
    );

    // then
    const buttonGroup = screen.getByRole('button').parentElement;
    expect(buttonGroup).toBeInTheDocument();
    expect(buttonGroup).toHaveClass('btn-group');
  });

  it('Should add size', () => {
    // when
    render(
      <ButtonGroup bsSize="large">
        <Button>Title</Button>
      </ButtonGroup>
    );

    // then
    const buttonGroup = screen.getByRole('button').parentElement;
    expect(buttonGroup).toHaveClass('btn-group-lg');
  });

  it('Should add vertical variation', () => {
    // when
    render(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>
    );

    // then
    const buttonGroup = screen.getByRole('button').parentElement;
    expect(buttonGroup).toHaveClass('btn-group-vertical');
  });

  it('Should add block variation', () => {
    // when
    render(
      <ButtonGroup vertical block>
        <Button>Title</Button>
      </ButtonGroup>
    );

    // then
    const buttonGroup = screen.getByRole('button').parentElement;
    expect(buttonGroup).toHaveClass('btn-block');
  });

  it('Should warn about block without vertical', () => {
    // given
    console.error = jest.fn();

    // when
    render(
      <ButtonGroup block>
        <Button>Title</Button>
      </ButtonGroup>
    );

    // then
    expect(console.error).toHaveBeenCalledWith(
      'Warning: Failed prop type: `block` requires `vertical` to be set to have any effect\n    in ButtonGroup'
    );
  });

  it('Should add justified variation', () => {
    // when
    render(
      <ButtonGroup justified>
        <Button>Title</Button>
      </ButtonGroup>
    );

    // then
    const buttonGroup = screen.getByRole('button').parentElement;
    expect(buttonGroup).toHaveClass('btn-group-justified');
  });
});

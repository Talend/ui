import { render, screen } from '@testing-library/react';

import Button from './Button';
import FormControl from './FormControl';
import InputGroup from './InputGroup';

describe('<InputGroup>', () => {
  it('should render properly', () => {
    render(
      <InputGroup className="my-input-group">
        <InputGroup.Addon className="my-addon">Foo</InputGroup.Addon>

        <FormControl type="text" />

        <InputGroup.Button className="my-button">
          <Button>Bar</Button>
        </InputGroup.Button>
      </InputGroup>
    );
    expect(document.querySelector('.input-group.my-input-group')).toBeVisible();

    expect(
      document.querySelector('.input-group-addon.my-addon')
    ).toHaveTextContent('Foo');

    expect(
      document.querySelector('input.form-control[type="text"]')
    ).toBeVisible();

    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should support bsSize', () => {
    render(<InputGroup bsSize="small" />);
    expect(document.querySelector('.input-group.input-group-sm')).toBeVisible();
  });
});

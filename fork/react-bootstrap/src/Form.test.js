import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';
import FormGroup from './FormGroup';

describe('<Form>', () => {
  xit('should support horizontal', () => {
    shallow(
      <Form horizontal className="my-form">
        <FormGroup />
      </Form>
    )
      .assertSingle('form.form-horizontal.my-form')
      .assertSingle(FormGroup);
  });

  xit('should support inline', () => {
    shallow(
      <Form inline className="my-form">
        <FormGroup />
      </Form>
    )
      .assertSingle('form.form-inline.my-form')
      .assertSingle(FormGroup);
  });

  xit('should support custom componentClass', () => {
    shallow(
      <Form componentClass="fieldset" horizontal className="my-form">
        <FormGroup />
      </Form>
    )
      .assertSingle('fieldset.form-horizontal.my-form')
      .assertSingle(FormGroup);
  });
});

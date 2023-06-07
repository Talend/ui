import { render } from '@testing-library/react';

import FormControl from './FormControl';
import FormGroup from './FormGroup';

describe('<FormControl.Feedback>', () => {
  it('should render default success', () => {
    render(
      <FormGroup validationState="success">
        <FormControl.Feedback />
      </FormGroup>
    );
    expect(
      document.querySelector('.form-control-feedback.glyphicon-ok')
    ).toBeVisible();
  });

  // xit('should render default warning', () => {
  //   mount(
  //     <FormGroup validationState="warning">
  //       <FormControl.Feedback />
  //     </FormGroup>
  //   ).assertSingle('.form-control-feedback.glyphicon-warning-sign');
  // });

  // xit('should render default error', () => {
  //   mount(
  //     <FormGroup validationState="error">
  //       <FormControl.Feedback />
  //     </FormGroup>
  //   ).assertSingle('.form-control-feedback.glyphicon-remove');
  // });

  // xit('should render default validation state', () => {
  //   mount(
  //     <FormGroup validationState="success">
  //       <div>
  //         <FormControl.Feedback />
  //       </div>
  //     </FormGroup>
  //   ).assertSingle('.form-control-feedback.glyphicon-ok');
  // });

  // xit('should render custom component', () => {
  //   function MyComponent(props) {
  //     return <div {...props} />;
  //   }

  //   mount(
  //     <FormControl.Feedback>
  //       <MyComponent className="foo" />
  //     </FormControl.Feedback>
  //   ).assertSingle('MyComponent.foo.form-control-feedback');
  // });
});

import { render, screen } from '@testing-library/react';

import FormGroup from './FormGroup';

describe('<FormGroup>', () => {
  it('renders children', () => {
    render(
      <FormGroup>
        <span data-testid="child1" />
        <span data-testid="child2" />
      </FormGroup>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  // xit('renders with form-group class', () => {
  //   let instance = ReactTestUtils.renderIntoDocument(
  //     <FormGroup>
  //       <span />
  //     </FormGroup>
  //   );

  //   assert.ok(
  //     ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group')
  //   );
  // });

  // xit('renders form-group with sm or lg class when bsSize is small or large', () => {
  //   let instance = ReactTestUtils.renderIntoDocument(
  //     <FormGroup bsSize="small">
  //       <span />
  //     </FormGroup>
  //   );

  //   assert.ok(
  //     ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group')
  //   );
  //   assert.ok(
  //     ReactTestUtils.findRenderedDOMComponentWithClass(
  //       instance,
  //       'form-group-sm'
  //     )
  //   );

  //   instance = ReactTestUtils.renderIntoDocument(
  //     <FormGroup bsSize="large">
  //       <span />
  //     </FormGroup>
  //   );

  //   assert.ok(
  //     ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group')
  //   );
  //   assert.ok(
  //     ReactTestUtils.findRenderedDOMComponentWithClass(
  //       instance,
  //       'form-group-lg'
  //     )
  //   );
  // });

  // [
  //   {
  //     props: { validationState: 'success' },
  //     className: 'has-success',
  //   },
  //   {
  //     props: { validationState: 'warning' },
  //     className: 'has-warning',
  //   },
  //   {
  //     props: { validationState: 'error' },
  //     className: 'has-error',
  //   },
  //   {
  //     props: { className: 'custom-group' },
  //     className: 'custom-group',
  //   },
  // ].forEach(({ props, className }) => {
  //   xit(`does not render ${className} class`, () => {
  //     shallow(
  //       <FormGroup>
  //         <span />
  //       </FormGroup>
  //     ).assertNone(`.${className}`);
  //   });

  //   xit(`renders with ${className} class`, () => {
  //     shallow(
  //       <FormGroup {...props}>
  //         <span />
  //       </FormGroup>
  //     ).assertSingle(`.${className}`);
  //   });
  // });

  // describe('feedback', () => {
  //   xit('should not have feedback without feedback component', () => {
  //     shallow(<FormGroup validationState="success" />).assertNone(
  //       '.has-feedback'
  //     );
  //   });

  //   xit('should have feedback with feedback component', () => {
  //     shallow(
  //       <FormGroup validationState="success">
  //         <FormControl.Feedback />
  //       </FormGroup>
  //     ).assertSingle('.has-feedback');
  //   });

  //   xit('should have feedback with nested feedback component', () => {
  //     shallow(
  //       <FormGroup validationState="success">
  //         <div>
  //           <FormControl.Feedback />
  //         </div>
  //       </FormGroup>
  //     ).assertSingle('.has-feedback');
  //   });

  //   xit('should have feedback with custom feedback component', () => {
  //     shallow(
  //       <FormGroup validationState="success">
  //         <div bsRole="feedback" />
  //       </FormGroup>
  //     ).assertSingle('.has-feedback');
  //   });
  // });
});

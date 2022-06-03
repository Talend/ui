import React from 'react';
import { mount, shallow } from 'enzyme';

import Radio from '../src/Radio';

import { shouldWarn } from './helpers';

describe('<Radio>', () => {
  xit('should render correctly', () => {
    const wrapper = shallow(
      <Radio name="foo" checked className="my-radio">
        My label
      </Radio>
    );

    wrapper
      .assertSingle('div.radio.my-radio')
      .assertSingle('input[type="radio"][name="foo"][checked]');

    wrapper.assertSingle('label').text().should.equal('My label');
  });

  xit('should support inline', () => {
    const wrapper = shallow(
      <Radio inline name="foo" className="my-radio">
        My label
      </Radio>
    );

    wrapper
      .assertSingle('label.radio-inline.my-radio')
      .assertSingle('input[type="radio"][name="foo"]');

    wrapper.assertSingle('label').text().should.equal('My label');
  });

  xit('should support validation state', () => {
    shallow(<Radio validationState="success" />).assertSingle('.has-success');
  });

  xit('should not support validation state when inline', () => {
    shouldWarn('ignored');

    shallow(<Radio inline validationState="success" />)
      .find('.has-success')
      .should.have.length(0);
  });

  xit('should support inputRef', () => {
    class Container extends React.Component {
      render() {
        return (
          <Radio
            inputRef={(ref) => {
              this.input = ref;
            }}
          />
        );
      }
    }

    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).to.equal('INPUT');
  });
});

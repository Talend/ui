import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Fade from './Fade';

describe('Fade', () => {
  let Component, instance;

  beforeEach(() => {
    Component = class extends React.Component {
      render() {
        let { children, ...props } = this.props;

        return (
          <Fade ref={(r) => (this.fade = r)} {...props} {...this.state}>
            <div>{children}</div>
          </Fade>
        );
      }
    };
  });

  xit('Should default to hidden', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(instance.fade.props.in === false);
  });

  xit('Should always have the "fade" class', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(instance.fade.props.in === false);

    assert.equal(ReactDOM.findDOMNode(instance).className, 'fade');
  });

  xit('Should add "in" class when entering', (done) => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    function onEntering() {
      assert.equal(ReactDOM.findDOMNode(instance).className, 'fade in');
      done();
    }

    assert.ok(instance.fade.props.in === false);

    instance.setState({ in: true, onEntering });
  });

  xit('Should remove "in" class when exiting', (done) => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component in>Panel content</Component>
    );

    function onExiting() {
      assert.equal(ReactDOM.findDOMNode(instance).className, 'fade');
      done();
    }

    assert.equal(ReactDOM.findDOMNode(instance).className, 'fade in');

    instance.setState({ in: false, onExiting });
  });
});

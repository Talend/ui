import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Modal from '../src/Modal';

describe('Modal.Footer', () => {
  xit('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Footer />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "modal-footer" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Footer />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-footer');
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Footer className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-footer');
    assert.include(classes, 'custom-class');
  });

  xit('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Footer componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Footer>
        <strong>Content</strong>
      </Modal.Footer>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

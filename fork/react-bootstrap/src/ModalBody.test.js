import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Modal from '../src/Modal';

describe('Modal.Body', () => {
  xit('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Body />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "modal-body" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Body />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-body');
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-body');
    assert.include(classes, 'custom-class');
  });

  xit('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body>
        <strong>Content</strong>
      </Modal.Body>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Modal from '../src/Modal';

describe('Modal.Title', () => {
  xit('uses "h4" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Title />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
  });

  xit('has "modal-title" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Title />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-title');
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-title');
    assert.include(classes, 'custom-class');
  });

  xit('should allow custom elements instead of "h4"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title componentClass="h3" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H3');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title>
        <strong>Children</strong>
      </Modal.Title>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

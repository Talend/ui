import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Modal from '../src/Modal';

describe('Modal.Header', () => {
  xit('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Header />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "modal-header" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal.Header />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-header');
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Header className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-header');
    assert.include(classes, 'custom-class');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Header>
        <strong>Content</strong>
      </Modal.Header>
    );

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });

  xit('has closeButton without a containing Modal and renders', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Header closeButton />
    );

    assert.isNotNull(ReactDOM.findDOMNode(instance));
  });

  xit('Should trigger onHide when modal is closed', () => {
    const onHideSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Header closeButton onHide={onHideSpy} />
    );

    const closeButton = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'close'
    );

    ReactTestUtils.Simulate.click(closeButton);

    expect(onHideSpy).to.have.been.called;
  });
});

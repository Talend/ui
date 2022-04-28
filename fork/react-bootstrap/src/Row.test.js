import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Row from '../src/Row';

describe('Row', () => {
  xit('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Row />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "row" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Row>Row content</Row>);
    assert.equal(ReactDOM.findDOMNode(instance).className, 'row');
  });

  xit('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Row className="bob" />);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\brow\b/));
  });

  xit('allows custom elements instead of "div"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Row componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Table from '../src/Table';

describe('Table', () => {
  xit('Should be a table', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Table />);
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'TABLE');
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable\b/));
  });

  xit('Should have correct class when striped', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Table striped />);
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\btable-striped\b/)
    );
  });

  xit('Should have correct class when hover', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Table hover />);
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\btable-hover\b/)
    );
  });

  xit('Should have correct class when bordered', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Table bordered />);
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\btable-bordered\b/)
    );
  });

  xit('Should have correct class when condensed', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Table condensed />);
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\btable-condensed\b/)
    );
  });

  xit('Should have responsive wrapper', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Table responsive />);
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\btable-responsive\b/)
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).firstChild.className.match(/\btable\b/)
    );
  });
});

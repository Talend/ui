import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Well from '../src/Well';

describe('Well', () => {
  xit('Should output a well with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well>
        <strong>Content</strong>
      </Well>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });

  xit('Should have a well class', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Well>Content</Well>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bwell\b/));
  });

  xit('Should accept bsSize arguments', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well bsSize="small">Content</Well>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bwell-sm\b/));
  });
});

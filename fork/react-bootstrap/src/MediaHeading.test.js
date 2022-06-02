import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe('Media.Heading', () => {
  xit('uses "h4" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Heading />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
  });

  xit('has "media-heading" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Heading />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-heading');
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Heading className="custom-class" />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-heading');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });

  xit('should allow custom elements instead of "h4"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Heading componentClass="h2" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H2');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Heading>
        <strong>Children</strong>
      </Media.Heading>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

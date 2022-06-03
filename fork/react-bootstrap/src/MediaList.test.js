import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe('Media.List', () => {
  xit('uses "ul"', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.List />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'UL');
  });
  xit('has "media-list" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.List />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-list');
  });
  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.List className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media-list');
    assert.include(classes, 'custom-class');
  });
  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.List>
        <strong>Content</strong>
      </Media.List>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

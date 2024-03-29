import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe('Media.Left', () => {
  xit('uses "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Left />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "media-left" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Left />);

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-left\b/));
  });

  xit('should be able to change alignment to middle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Left align="middle" />
    );

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-middle\b/)
    );
  });

  xit('should be able to change alignment to bottom', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Left align="bottom" />
    );

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-bottom\b/)
    );
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Left className="custom-class" />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-left');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Left>
        <img />
      </Media.Left>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });
});

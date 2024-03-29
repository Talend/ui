import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe('<Media.Body>', () => {
  xit('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Body />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "media-body" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Body />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-body');
  });

  xit('should be able to change alignment to middle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Body align="middle" />
    );

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-middle\b/)
    );
  });

  xit('should be able to change alignment to bottom', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Body align="bottom" />
    );

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-bottom\b/)
    );
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Body className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media-body');
    assert.include(classes, 'custom-class');
  });

  xit('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Body componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Body>
        <strong>Content</strong>
      </Media.Body>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

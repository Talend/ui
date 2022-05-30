import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe('Media', () => {
  xit('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  xit('has "media" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media />);

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
  });

  xit('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media className="custom-class" />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });

  xit('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  xit('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media>
        <strong>Children</strong>
      </Media>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });
});

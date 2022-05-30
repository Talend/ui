import React from 'react';
import { mount, shallow } from 'enzyme';

import SafeAnchor from '../src/SafeAnchor';

describe('SafeAnchor', () => {
  xit('renders an anchor tag', () => {
    mount(<SafeAnchor />)
      .getDOMNode()
      .tagName.should.equal('A');
  });

  xit('forwards provided href', () => {
    shallow(<SafeAnchor href="http://google.com" />)
      .find('a')
      .prop('href')
      .should.equal('http://google.com');
  });

  xit('ensures that an href is provided', () => {
    mount(<SafeAnchor />)
      .getDOMNode()
      .hasAttribute('href').should.be.true;
  });

  xit('forwards onClick handler', () => {
    const handleClick = sinon.spy();

    shallow(<SafeAnchor onClick={handleClick} />)
      .find('a')
      .simulate('click', { preventDefault() {} });

    handleClick.should.have.been.calledOnce;
  });

  xit('provides onClick handler as onKeyDown handler for "space"', () => {
    const handleClick = sinon.spy();

    shallow(<SafeAnchor onClick={handleClick} />)
      .find('a')
      .simulate('keyDown', { key: ' ', preventDefault() {} });

    handleClick.should.have.been.calledOnce;
  });

  xit('prevents default when no href is provided', () => {
    const handleClick = sinon.spy();

    const wrapper = mount(<SafeAnchor onClick={handleClick} />);
    wrapper.find('a').simulate('click');

    wrapper
      .setProps({ href: '#' })
      .find('a')
      .simulate('click');

    expect(handleClick).to.have.been.calledTwice;
    expect(handleClick.getCall(0).args[0].isDefaultPrevented()).to.be.true;
    expect(handleClick.getCall(1).args[0].isDefaultPrevented()).to.be.true;
  });

  xit('does not prevent default when href is provided', () => {
    const handleClick = sinon.spy();

    mount(<SafeAnchor href="#foo" onClick={handleClick} />)
      .find('a')
      .simulate('click');

    expect(handleClick).to.have.been.calledOnce;
    expect(handleClick.getCall(0).args[0].isDefaultPrevented()).to.be.false;
  });

  xit('Should disable link behavior', () => {
    let clickSpy = sinon.spy();
    let spy = sinon.spy(SafeAnchor.prototype, 'handleClick');

    mount(
      <SafeAnchor disabled href="#foo" onClick={clickSpy}>
        Title
      </SafeAnchor>
    ).simulate('click');

    expect(spy).to.have.been.calledOnce;
    expect(clickSpy).to.have.not.been.called;
    expect(spy.getCall(0).args[0].isDefaultPrevented()).to.equal(true);
    expect(spy.getCall(0).args[0].isPropagationStopped()).to.equal(true);
  });

  xit('forwards provided role', () => {
    shallow(<SafeAnchor role="test" />)
      .find('a')
      .prop('role')
      .should.equal('test');
  });

  xit('forwards provided role with href', () => {
    shallow(<SafeAnchor role="test" href="http://google.com" />)
      .find('a')
      .prop('role')
      .should.equal('test');
  });

  xit('set role=button with no provided href', () => {
    shallow(<SafeAnchor />)
      .find('a')
      .prop('role')
      .should.equal('button');

    shallow(<SafeAnchor href="#" />)
      .find('a')
      .prop('role')
      .should.equal('button');
  });

  xit('sets no role with provided href', () => {
    expect(
      shallow(<SafeAnchor href="http://google.com" />)
        .find('a')
        .prop('role')
    ).to.not.exist;
  });
});

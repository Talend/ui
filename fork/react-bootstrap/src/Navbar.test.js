import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavItem from '../src/NavItem';

import { addStyle } from '../src/utils/bootstrapUtils';

import { getOne } from './helpers';

describe('<Navbar>', () => {
  xit('Should create nav element', () => {
    const wrapper = mount(<Navbar />);
    const nav = wrapper.getDOMNode();
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.notOk(nav.getAttribute('role'));
  });

  xit('Should add "navigation" role when not using a `<nav>`', () => {
    const wrapper = mount(<Navbar componentClass="div" />);
    const nav = wrapper.getDOMNode();
    assert.equal(nav.nodeName, 'DIV');
    assert.ok(nav.getAttribute('role') === 'navigation');
  });

  xit('Should add fixedTop variation class', () => {
    const wrapper = mount(<Navbar fixedTop />);
    assert.ok(wrapper.find('.navbar-fixed-top').exists());
  });

  xit('Should add fixedBottom variation class', () => {
    const wrapper = mount(<Navbar fixedBottom />);
    assert.ok(wrapper.find('.navbar-fixed-bottom').exists());
  });

  xit('Should add staticTop variation class', () => {
    const wrapper = mount(<Navbar staticTop />);
    assert.ok(wrapper.find('.navbar-static-top').exists());
  });

  xit('Should add inverse variation class', () => {
    const wrapper = mount(<Navbar inverse />);
    assert.ok(wrapper.find('.navbar-inverse').exists());
  });

  xit('Should not add default class along with custom styles', () => {
    addStyle(Navbar, 'custom');

    const wrapper = mount(<Navbar bsStyle="custom" />);

    expect(() => wrapper.find('.navbar-default').getDOMNode()).to.throw();
  });

  xit('Should add fluid variation class', () => {
    const wrapper = mount(<Navbar fluid />);
    assert.ok(wrapper.find('.container-fluid').exists());
  });

  xit('Should override role attribute', () => {
    const wrapper = mount(<Navbar role="banner" />);
    assert.ok(wrapper.getDOMNode().getAttribute('role'), 'banner');
  });

  xit('Should override node class', () => {
    const wrapper = mount(<Navbar componentClass="header" />);
    assert.equal(wrapper.getDOMNode().nodeName, 'HEADER');
  });

  xit('Should add header with brand', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const header = wrapper.find('.navbar-header').getDOMNode();

    const brand = getOne(header.getElementsByClassName('navbar-brand'));

    assert.ok(brand);
    assert.equal(brand.nodeName, 'SPAN');
    assert.equal(brand.textContent, 'Brand');
  });

  xit('Should add link element with navbar-brand class using NavBrand Component', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Brand</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const brand = wrapper.find('.navbar-brand').getDOMNode();

    assert.ok(brand);
    assert.equal(brand.nodeName, 'A');
    assert.equal(brand.textContent, 'Brand');
  });

  xit('Should pass navbar context to navs', () => {
    const wrapper = mount(
      <Navbar>
        <Nav />
      </Navbar>
    );

    const nav = wrapper.find(Nav).instance();

    assert.ok(nav.context.$bs_navbar);
  });

  xit('Should add default toggle', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    wrapper.find('.navbar-toggle').getDOMNode();
    expect(wrapper.find('.icon-bar').exists()).to.be.true;
  });

  xit('Should add custom toggle', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle>
            <span className="test">hi</span>
          </Navbar.Toggle>
        </Navbar.Header>
      </Navbar>
    );

    wrapper.find('.navbar-toggle').getDOMNode();
    wrapper.find('.test').getDOMNode();
  });

  xit('Should trigger onToggle', () => {
    const toggleSpy = sinon.spy();
    const wrapper = mount(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    const toggle = wrapper.find('.navbar-toggle').getDOMNode();

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));

    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(true);
  });

  xit('Should support custom props', () => {
    const clickSpy = sinon.spy();

    const wrapper = mount(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle
            onClick={clickSpy}
            className="foo bar"
            style={{ height: 100 }}
          />
        </Navbar.Header>
      </Navbar>
    );

    const toggle = wrapper.find('.navbar-toggle').getDOMNode();

    expect(toggle.className).to.match(/foo bar/);
    expect(toggle.style.height).to.equal('100px');

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));
    expect(clickSpy).to.have.been.called;
  });

  xit('Should render collapse', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>
    );

    assert.ok(wrapper.find('.navbar-collapse').exists());
  });

  xit('Should pass expanded to Collapse', () => {
    const wrapper = mount(
      <Navbar defaultExpanded>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>
    );

    const collapse = wrapper.find(Navbar.Collapse).instance();

    expect(collapse.context.$bs_navbar.expanded).to.equal(true);
  });

  xit('Should wire the toggle to the collapse', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>
    );

    const toggle = wrapper.find('.navbar-toggle').getDOMNode();
    const collapse = wrapper.find(Navbar.Collapse).instance();

    expect(collapse.context.$bs_navbar.expanded).to.not.be.ok;
    expect(toggle.className).to.match(/collapsed/);

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));

    expect(collapse.context.$bs_navbar.expanded).to.equal(true);
    expect(toggle.className).to.not.match(/collapsed/);
  });

  xit('Should open external href link in collapseOnSelect', () => {
    const selectSpy = sinon.spy();
    const navItemOnClick = sinon.stub();
    const wrapper = mount(
      <Navbar onSelect={selectSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1}
              href="https://www.google.com"
              onClick={navItemOnClick}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = wrapper.find('a').getDOMNode();

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(link));

    const event = navItemOnClick.getCall(0).args[0];
    const preventDefaultSpy = sinon.spy(event.preventDefault);

    expect(selectSpy).to.be.calledOnce;
    expect(navItemOnClick).to.be.calledOnce;
    expect(event.target.getAttribute('href')).to.be.equal(
      'https://www.google.com'
    );
    expect(preventDefaultSpy).to.not.be.called;
  });

  xit('Should fire external href click', () => {
    const navItemSpy = sinon.spy();
    const wrapper = mount(
      <Navbar defaultExpanded>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1}
              href="https://www.google.com"
              onClick={navItemSpy}
            >
              <span className="link-text">Option 1</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = wrapper.find('.link-text').getDOMNode();

    ReactTestUtils.Simulate.click(link);

    expect(navItemSpy.getCall(0).args[0].isDefaultPrevented()).to.be.false;
  });

  xit('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', () => {
    const toggleSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    const wrapper = mount(
      <Navbar collapseOnSelect onToggle={toggleSpy} defaultExpanded>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={navItemSpy}>
              <span className="link-text">Option 1</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = wrapper.find('.link-text').getDOMNode();

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(link));

    expect(navItemSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(false);
  });

  xit('Should fire onSelect with eventKey for nav children', () => {
    const selectSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    const wrapper = mount(
      <Navbar onSelect={selectSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={navItemSpy}>
              <span className="onselect-text">Option 1</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = wrapper.find('.onselect-text').getDOMNode();

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(link));

    expect(navItemSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledWith(1);
  });

  xit('Should pass `bsClass` down to sub components', () => {
    const wrapper = mount(
      <Navbar bsClass="my-navbar">
        <Navbar.Header>
          <Navbar.Brand />
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form />
          <Navbar.Text />
          <Navbar.Link />
          <Nav pullRight />
        </Navbar.Collapse>
      </Navbar>
    );

    wrapper.find('.my-navbar').getDOMNode();
    wrapper.find('.my-navbar-header').getDOMNode();
    wrapper.find('.my-navbar-brand').getDOMNode();
    wrapper.find('.my-navbar-toggle').getDOMNode();
    wrapper.find('.my-navbar-text').getDOMNode();
    wrapper.find('.my-navbar-link').getDOMNode();
    wrapper.find('.my-navbar-form').getDOMNode();
    wrapper.find('.my-navbar-collapse').getDOMNode();
    wrapper.find('.my-navbar-nav').getDOMNode();
    wrapper.find('.my-navbar-right').getDOMNode();
  });

  xit('Should add custom className to header', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Header className="my-test">
          <Navbar.Brand />
        </Navbar.Header>
      </Navbar>
    );

    wrapper.find('.my-test').hostNodes().getDOMNode();
  });
});

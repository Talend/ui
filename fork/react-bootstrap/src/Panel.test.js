import React from 'react';

import { mount } from 'enzyme';

import Panel from '../src/Panel';

describe('<Panel>', () => {
  xit('Should have class and body', () => {
    const inst = mount(
      <Panel>
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('div.panel.panel-default');
    inst.assertSingle('div.panel-body');
  });

  xit('Should have bootstrap style class', () => {
    mount(
      <Panel bsStyle="primary">
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    ).assertSingle('div.panel-primary');
  });

  xit('Should honor additional classes passed in; adding not overriding', () => {
    mount(<Panel className="foo" />).assertSingle('div.foo');
  });

  xit('Should have unwrapped header', () => {
    mount(
      <Panel>
        <Panel.Heading>Heading</Panel.Heading>
      </Panel>
    )
      .assertSingle('div.panel-heading')
      .text()
      .should.equal('Heading');
  });

  xit('Should have custom component header', () => {
    mount(
      <Panel>
        <Panel.Heading componentClass="h3">Heading</Panel.Heading>
      </Panel>
    )
      .assertSingle('h3.panel-heading')
      .text()
      .should.equal('Heading');
  });

  describe('<PanelTitle>', () => {
    xit('Should render a title', () => {
      mount(<Panel.Title>foo</Panel.Title>)
        .assertSingle('div.panel-title')
        .text()
        .should.equal('foo');
    });

    xit('Should render a custom component', () => {
      mount(<Panel.Title componentClass="h3">foo</Panel.Title>).assertSingle(
        'h3.panel-title'
      );
    });

    xit('Should render with a toggle', () => {
      mount(<Panel.Title toggle>foo</Panel.Title>).assertSingle(
        '.panel-title > PanelToggle'
      );
    });
  });

  describe('<PanelToggle>', () => {
    xit('Should render a Toggle a SafeAnchor', () => {
      mount(<Panel.Toggle>foo</Panel.Toggle>)
        .assertSingle('SafeAnchor')
        .assertSingle('a[role="button"][href="#"]');
    });

    xit('Should render a custom component', () => {
      mount(<Panel.Toggle componentClass="h3">foo</Panel.Toggle>).assertSingle(
        'h3'
      );
    });

    xit('Should simulate onToggle', (done) => {
      mount(
        <Panel onToggle={() => done()}>
          <Panel.Toggle>foo</Panel.Toggle>
        </Panel>
      )
        .assertSingle('PanelToggle')
        .simulate('click');
    });
  });

  xit('Should have a footer', () => {
    mount(
      <Panel>
        <Panel.Footer>foo</Panel.Footer>
      </Panel>
    ).assertSingle('div.panel-footer');
  });

  xit('Should have collapse classes', () => {
    mount(
      <Panel defaultExpanded>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    ).assertSingle('div.panel-collapse.collapse.in');
  });

  xit('Should pass through dom properties', () => {
    mount(<Panel id="testid">Panel content</Panel>).assertSingle('div#testid');
  });

  xit('Should set ids on toggle and collapse', () => {
    const inst = mount(
      <Panel id="testid">
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('#testid--body.panel-collapse');
    inst.assertSingle('#testid--heading.panel-heading');
  });

  xit('Should be open', () => {
    const inst = mount(
      <Panel defaultExpanded>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('.in.panel-collapse');
    inst.assertNone('a.collapsed');
  });

  xit('Should be closed', () => {
    const inst = mount(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertNone('.in.panel-collapse');
    inst.assertSingle('a.collapsed');
  });

  xit('Should toggle when uncontrolled', () => {
    const wrapper = mount(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    wrapper.find('a').simulate('click');

    expect(wrapper.find(Panel.ControlledComponent).props().expanded).to.equal(
      true
    );
  });

  describe('Web Accessibility', () => {
    xit('Should be aria-expanded=true', () => {
      mount(
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      ).assertSingle('.panel-title a[aria-expanded=true]');
    });

    xit('Should be aria-expanded=false', () => {
      mount(
        <Panel defaultExpanded={false}>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      )
        .assertSingle('.panel-title a')
        .assertSingle('[aria-expanded=false]');
    });

    xit('Should add aria-controls with id', () => {
      const inst = mount(
        <Panel id="testid">
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      );

      inst.assertSingle('a[aria-controls="testid--body"]');
      inst.assertSingle('.panel-collapse[aria-labelledby="testid--heading"]');
    });
  });
});

import React, { useState, useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import keycode from 'keycode';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';

import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import Grid from './Grid';
import MenuItem from './MenuItem';

import { shouldWarn } from './helpers';

function CustomMenu({ children, ...props }) {
  return (
    <div className="custom-menu" {...props}>
      {children}
    </div>
  );
}

describe('<Dropdown>', () => {
  const BaseDropdown = Dropdown.ControlledComponent;

  const dropdownChildren = [
    <Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>,
    <Dropdown.Menu key="menu">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </Dropdown.Menu>,
  ];

  const simpleDropdown = (
    <Dropdown data-testid="test-id" id="lol">
      {dropdownChildren}
    </Dropdown>
  );

  it('renders div with dropdown class', () => {
    // when
    render(<Dropdown id="test-id">{dropdownChildren}</Dropdown>);

    // then
    const group = screen.getByRole('menu').parentElement;
    expect(group.tagName).toBe('DIV');
    expect(group).toHaveClass('dropdown');
    expect(group).not.toHaveClass('dropup');
  });

  it('renders div with dropup class', () => {
    // when
    render(
      <Dropdown title="Dropup" dropup id="test-id">
        {dropdownChildren}
      </Dropdown>
    );

    // then
    const group = screen.getByRole('menu').parentElement;
    expect(group.tagName).toBe('DIV');
    expect(group).not.toHaveClass('dropdown');
    expect(group).toHaveClass('dropup');
  });

  it('renders toggle with Dropdown.Toggle', () => {
    // when
    render(simpleDropdown);

    // then
    const toggle = screen.getByRole('button', { name: 'Child Title' });
    expect(toggle.tagName).toBe('BUTTON');
    expect(toggle).toHaveClass('btn btn-default dropdown-toggle');
    expect(toggle).toHaveAttribute('type', 'button');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders dropdown toggle button caret', () => {
    // when
    render(simpleDropdown);

    // then
    const btn = screen.getByRole('button', { name: 'Child Title' });
    expect(btn.querySelector('span.caret')).toBeTruthy();
  });

  it('does not render toggle button caret', () => {
    // when
    render(<Dropdown.Toggle noCaret>Child Text</Dropdown.Toggle>);

    // then
    const caret = screen.getByRole('button', { name: 'Child Text' });
    expect(caret.querySelector('.caret')).toBeFalsy();
  });

  it('renders custom menu', () => {
    // when
    render(
      <Dropdown title="Single child" id="test-id">
        <Dropdown.Toggle>Child Text</Dropdown.Toggle>

        <CustomMenu role="menu">
          <MenuItem>Item 1</MenuItem>
        </CustomMenu>
      </Dropdown>
    );

    // then
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toHaveClass('custom-menu');
  });

  it('forwards pullRight to menu', () => {
    // when
    render(
      <Dropdown pullRight id="test-id">
        {dropdownChildren}
      </Dropdown>
    );

    // then
    expect(screen.getByRole('menu')).toHaveClass('dropdown-menu-right');
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', () => {
    // given
    render(simpleDropdown);
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('closes when clicked outside', () => {
    // given
    render(simpleDropdown);
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    // when
    userEvent.click(document.body);

    // then
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('closes when mousedown outside if rootCloseEvent set', () => {
    // given
    render(
      <Dropdown data-testid="test-id" rootCloseEvent="mousedown">
        {dropdownChildren}
      </Dropdown>
    );
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    // when
    fireEvent.mouseDown(document.body);

    // then
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('opens if dropdown contains no focusable menu item', () => {
    // given
    render(
      <Dropdown title="custom child" data-testid="dropdown">
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <li>Some custom nonfocusable content</li>
        </Dropdown.Menu>
      </Dropdown>
    );

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(screen.getByTestId('dropdown')).toHaveClass('open');
  });

  it('when focused and closed toggles open when the key "down" is pressed', () => {
    // given
    render(simpleDropdown);

    // when
    fireEvent.keyDown(screen.getByRole('button'), {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: keycode('down'),
      charCode: keycode('down'),
    });

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
    // when
    render(simpleDropdown);

    // then
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('does not pass onSelect to DOM node', () => {
    // given
    const onSelect = jest.fn();
    render(
      <Dropdown data-testid="test-id" onSelect={onSelect}>
        {dropdownChildren}
      </Dropdown>
    );
    expect(onSelect).not.toBeCalled();

    // when
    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByRole('menuitem', { name: 'Item 4' }));

    // then
    expect(onSelect).toBeCalled();
  });

  it('closes when child MenuItem is selected', () => {
    // given
    render(
      <Dropdown data-testid="test-id" rootCloseEvent="mousedown">
        {dropdownChildren}
      </Dropdown>
    );
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // when
    userEvent.click(screen.getByRole('button'));

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    // when
    userEvent.click(screen.getByRole('menuitem', { name: 'Item 4' }));

    // then
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('does not close when onToggle is controlled', () => {
    // given
    const handleSelect = jest.fn();
    render(
      <Dropdown open onToggle={handleSelect} data-testid="test-id">
        {dropdownChildren}
      </Dropdown>
    );

    // when
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('test-id')).toHaveClass('open');
    userEvent.click(screen.getByRole('menuitem', { name: 'Item 4' }));

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');
  });

  it('is open with explicit prop', () => {
    // given
    function OpenProp() {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <button onClick={() => setOpen((oldOpen) => !oldOpen)}>
            Outer button
          </button>
          <Dropdown
            open={open}
            onToggle={() => {}}
            title="Prop open control"
            data-testid="test-id"
            id="lol"
          >
            {dropdownChildren}
          </Dropdown>
        </div>
      );
    }

    render(<OpenProp />);
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');

    // when
    userEvent.click(screen.getByRole('button', { name: 'Outer button' }));

    // then
    expect(screen.getByTestId('test-id')).toHaveClass('open');

    // when
    userEvent.click(screen.getByRole('button', { name: 'Outer button' }));

    // then
    expect(screen.getByTestId('test-id')).not.toHaveClass('open');
  });

  it('has aria-labelledby same id as                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ezz                                toggle button', () => {
    // when
    render(simpleDropdown);

    // then
    const id = screen.getByRole('button').getAttribute('id');
    expect(screen.getByRole('menu')).toHaveAttribute('aria-labelledby', id);
  });

  describe('PropType validation', () => {
    describe('children', () => {
      const originalConsoleError = console.error;

      beforeEach(() => {
        console.error = jest.fn();
      });

      afterEach(() => {
        console.error = originalConsoleError;
      });

      it('menu is exclusive', () => {
        // when
        render(
          <Dropdown id="test">
            <Dropdown.Toggle />
            <Dropdown.Menu />
            <Dropdown.Menu />
          </Dropdown>
        );

        // then
        expect(console.error.mock.calls[0]).toContain(
          '(children) Dropdown - Duplicate children detected of bsRole: menu. Only one child each allowed with the following bsRoles: menu'
        );
      });

      xit('menu is required', () => {
        // Dropdowns can't render without a menu.
        render(
          <Dropdown id="test">
            <Dropdown.Toggle />
          </Dropdown>
        );

        // then
        expect(console.error.mock.calls[0][0]).toContain(
          'Warning: Failed prop type: (children) Dropdown - Missing a required child with bsRole: menu. Dropdown must have at least one child of each of the following bsRoles: toggle, menu'
        );
      });

      it('toggles are not exclusive', () => {
        // when
        render(
          <Dropdown id="test">
            <Dropdown.Toggle />
            <Dropdown.Toggle />
            <Dropdown.Menu />
          </Dropdown>
        );

        // then
        expect(console.error).not.toBeCalled();
      });

      it('toggle is required', () => {
        // when
        render(
          <Dropdown id="test">
            <Dropdown.Menu />
          </Dropdown>
        );

        // then
        expect(console.error.mock.calls[0]).toContain(
          '(children) Dropdown - Missing a required child with bsRole: toggle. Dropdown must have at least one child of each of the following bsRoles: toggle, menu'
        );
      });
    });
  });

  describe('ref', () => {
    const originalConsoleError = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = originalConsoleError;
    });

    it('chains refs', () => {
      // given
      function RefDropdown() {
        const [hasBaseRef, setHasBaseRef] = useState(false);
        const [hasToggleRef, setHasToggleRef] = useState(false);
        const [hasMenuRef, setHasMenuRef] = useState(false);

        const setBaseRef = () => {
          setHasBaseRef(true);
        };
        const setToggleRef = () => {
          setHasToggleRef(true);
        };
        const setMenuRef = () => {
          setHasMenuRef(true);
        };

        return (
          <>
            <Dropdown ref={setBaseRef} id="test">
              <Dropdown.Toggle ref={setToggleRef} />
              <Dropdown.Menu ref={setMenuRef} />
            </Dropdown>
            {hasBaseRef && <div data-testid="baseRefSet" />}
            {hasToggleRef && <div data-testid="toggleRefSet" />}
            {hasMenuRef && <div data-testid="menuRefSet" />}
          </>
        );
      }

      // when
      render(<RefDropdown />);

      // then
      expect(screen.getByTestId('baseRefSet')).toBeInTheDocument();
      expect(screen.getByTestId('toggleRefSet')).toBeInTheDocument();
      expect(screen.getByTestId('menuRefSet')).toBeInTheDocument();
    });

    it('warns when a string ref is specified', () => {
      // given
      function RefDropdown() {
        return (
          <Dropdown id="test">
            <Dropdown.Toggle ref="toggle" />
            <Dropdown.Menu />
          </Dropdown>
        );
      }

      // when
      render(<RefDropdown />);

      // then
      expect(console.error.mock.calls[0][0]).toContain(
        'String refs are not supported'
      );
    });
  });

  describe('focusable state', () => {
    let focusableContainer;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('when focused and closed sets focus on first menu item when the key "down" is pressed', () => {
      // given
      render(simpleDropdown, { container: focusableContainer });

      // when
      fireEvent.focus(screen.getByRole('button'));
      fireEvent.keyDown(screen.getByRole('button'), {
        key: 'ArrowDown',
        keyCode: keycode('down'),
      });

      // then
      expect(screen.getByRole('menuitem', { name: 'Item 1' })).toHaveFocus();
    });

    it('when focused and open does not toggle closed when the key "down" is pressed', () => {
      // given
      render(simpleDropdown);

      // when
      userEvent.click(screen.getByRole('button'));
      fireEvent.keyDown(screen.getByRole('button'), {
        key: 'ArrowDown',
        keyCode: keycode('down'),
      });

      // then
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByTestId('test-id')).toHaveClass('open');
    });

    // This test is more complicated then it appears to need. This is
    // because there was an intermittent failure of the test when not structured this way
    // The failure occurred when all tests in the suite were run together, but not a subset of the tests.
    //
    // I am fairly confident that the failure is due to a test specific conflict and not an actual bug.
    it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', () => {
      // given
      render(
        <Dropdown defaultOpen role="menuitem" data-testid="test-id" id="lol">
          {dropdownChildren}
        </Dropdown>,
        { container: focusableContainer }
      );
      const firstItem = screen.getByRole('menuitem', { name: 'Item 1' });
      expect(firstItem).toHaveFocus();

      // when
      fireEvent.keyDown(firstItem, {
        key: 'Escape',
        keyCode: keycode('esc'),
      });

      // then
      expect(screen.getByRole('button')).toHaveFocus();
      expect(screen.getByTestId('test-id')).not.toHaveClass('open');
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', () => {
      // given
      render(
        <Grid>
          {simpleDropdown}
          <input type="text" id="next-focusable" />
        </Grid>,
        { attachTo: focusableContainer }
      );

      // when
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      fireEvent.keyDown(screen.getByRole('button'), {
        key: 'Tab',
        keyCode: keycode('tab'),
      });

      // then
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });
  });

  describe('DOM event and source passed to onToggle', () => {
    let focusableContainer;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('passes open, event, and source correctly when opened with click', () => {
      // given
      const onToggle = jest.fn();
      render(
        <Dropdown id="lol" data-testid="test-id" onToggle={onToggle}>
          {dropdownChildren}
        </Dropdown>
      );
      expect(onToggle).not.toHaveBeenCalled();

      // when
      userEvent.click(screen.getByRole('button'));

      // then
      expect(onToggle).toHaveBeenCalledWith(true, expect.any(Object), {
        source: 'click',
      });
    });

    it('passes open, event, and source correctly when closed with click', () => {
      // given
      const onToggle = jest.fn();
      render(
        <Dropdown id="test-id" onToggle={onToggle}>
          {dropdownChildren}
        </Dropdown>
      );
      expect(onToggle).not.toHaveBeenCalled();

      // when
      userEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledTimes(1);
      userEvent.click(screen.getByRole('button'));

      // then
      expect(onToggle.mock.calls.length).toBeGreaterThanOrEqual(2);
      expect(onToggle).toHaveBeenCalledWith(false, expect.any(Object), {
        source: 'click',
      });
    });

    it('passes open, event, and source correctly when child selected', () => {
      // given
      const onToggle = jest.fn();
      render(
        <Dropdown id="lol" data-testid="test-id" onToggle={onToggle}>
          <Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>
          <Dropdown.Menu key="menu">
            <MenuItem eventKey={1}>Item 1</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );

      // when
      userEvent.click(screen.getByRole('button'));
      expect(onToggle).toBeCalledTimes(1);
      userEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));

      // then
      expect(onToggle).toBeCalledTimes(2);
      expect(onToggle).toHaveBeenLastCalledWith(false, expect.any(Object), {
        source: 'select',
      });
    });

    it('passes open, event, and source correctly when opened with keydown', () => {
      // given
      const onToggle = jest.fn();
      render(
        <Dropdown id="lol" data-testid="test-id" onToggle={onToggle}>
          {dropdownChildren}
        </Dropdown>
      );

      // when
      fireEvent.keyDown(screen.getByRole('button'), {
        key: 'ArrowDown',
        keyCode: keycode('down'),
      });

      // then
      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(true, expect.any(Object), {
        source: 'keydown',
      });
    });
  });

  it('should derive bsClass from parent', () => {
    // when
    render(
      <Dropdown bsClass="my-dropdown" id="lol" data-testid="test-id">
        <Dropdown.Toggle bsClass="my-toggle">Child Title</Dropdown.Toggle>
        <Dropdown.Menu bsClass="my-menu">
          <MenuItem>Item 1</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );

    // then
    expect(screen.getByRole('button')).toHaveClass('my-dropdown-toggle');
    expect(screen.getByRole('menu')).toHaveClass('my-dropdown-menu');
  });
});

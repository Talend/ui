import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { mount, shallow } from 'enzyme';

import Dropdown from '../src/Dropdown';
import DropdownMenu from '../src/DropdownMenu';
import Grid from '../src/Grid';
import MenuItem from '../src/MenuItem';
import { shouldWarn } from './helpers';

class CustomMenu extends React.Component {
	render() {
		return <div className="custom-menu">{this.props.children}</div>;
	}
}

describe('<Dropdown>', () => {
	let BaseDropdown = Dropdown.ControlledComponent;

	const dropdownChildren = [
		<Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>,
		<Dropdown.Menu key="menu">
			<MenuItem>Item 1</MenuItem>
			<MenuItem>Item 2</MenuItem>
			<MenuItem>Item 3</MenuItem>
			<MenuItem>Item 4</MenuItem>
		</Dropdown.Menu>,
	];

	const simpleDropdown = <Dropdown id="test-id">{dropdownChildren}</Dropdown>;

	it('renders div with dropdown class', () => {
		const wrapper = mount(simpleDropdown);
		const node = wrapper.getDOMNode();

		node.tagName.should.equal('DIV');
		node.className.should.match(/\bdropdown\b/);
		node.className.should.not.match(/\bdropup\b/);
	});

	it('renders div with dropup class', () => {
		const wrapper = mount(
			<Dropdown title="Dropup" dropup id="test-id">
				{dropdownChildren}
			</Dropdown>,
		);
		const node = wrapper.getDOMNode();

		node.tagName.should.equal('DIV');
		node.className.should.not.match(/\bdropdown\b/);
		node.className.should.match(/\bdropup\b/);
	});

	it('renders toggle with Dropdown.Toggle', () => {
		const wrapper = mount(simpleDropdown);
		const buttonNode = wrapper.find('button').getDOMNode();

		buttonNode.textContent.should.match(/Child Title/);

		buttonNode.tagName.should.equal('BUTTON');
		buttonNode.className.should.match(/\bbtn[ $]/);
		buttonNode.className.should.match(/\bbtn-default\b/);
		buttonNode.className.should.match(/\bdropdown-toggle\b/);
		buttonNode.getAttribute('type').should.equal('button');
		buttonNode.getAttribute('aria-expanded').should.equal('false');
		buttonNode.getAttribute('id').should.be.ok;
	});

	it('renders dropdown toggle button caret', () => {
		const wrapper = mount(simpleDropdown);
		const caretNode = wrapper.find('.caret').getDOMNode();

		caretNode.tagName.should.equal('SPAN');
	});

	it('does not render toggle button caret', () => {
		const instance = ReactTestUtils.renderIntoDocument(
			<Dropdown.Toggle noCaret>Child Text</Dropdown.Toggle>,
		);
		const caretNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'caret');

		caretNode.length.should.equal(0);
	});

	it('renders custom menu', () => {
		const wrapper = mount(
			<Dropdown title="Single child" id="test-id">
				<Dropdown.Toggle>Child Text</Dropdown.Toggle>

				<CustomMenu bsRole="menu">
					<MenuItem>Item 1</MenuItem>
				</CustomMenu>
			</Dropdown>,
		);

		expect(wrapper.find(DropdownMenu)).to.have.lengthOf(0);
		expect(wrapper.find(CustomMenu)).to.have.lengthOf(1);
	});

	it('prop validation with multiple menus', () => {
		const props = {
			title: 'herpa derpa',
			children: [
				<Dropdown.Toggle>Child Text</Dropdown.Toggle>,
				<Dropdown.Menu>
					<MenuItem>Item 1</MenuItem>
				</Dropdown.Menu>,
				<Dropdown.Menu>
					<MenuItem>Item 1</MenuItem>
				</Dropdown.Menu>,
			],
		};

		let err = BaseDropdown.propTypes.children(props, 'children', 'DropdownButton');
		err.message.should.match(/Duplicate children.*bsRole: menu/);
	});

	it('forwards pullRight to menu', () => {
		const wrapper = mount(
			<Dropdown pullRight id="test-id">
				{dropdownChildren}
			</Dropdown>,
		);
		const menu = wrapper.find(DropdownMenu);

		expect(menu.props().pullRight).to.be.true;
	});

	// NOTE: The onClick event handler is invoked for both the Enter and Space
	// keys as well since the component is a button. I cannot figure out how to
	// get ReactTestUtils to simulate such though.
	it('toggles open/closed when clicked', () => {
		const wrapper = mount(simpleDropdown);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();

		node.className.should.not.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('false');

		ReactTestUtils.Simulate.click(buttonNode);

		node.className.should.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('true');

		ReactTestUtils.Simulate.click(buttonNode);

		node.className.should.not.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('false');
	});

	it('closes when clicked outside', () => {
		const wrapper = mount(simpleDropdown);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();

		node.className.should.not.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('false');

		ReactTestUtils.Simulate.click(buttonNode);

		node.className.should.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('true');

		// Use native events as the click doesn't have to be in the React portion
		const event = new MouseEvent('click');
		document.dispatchEvent(event);

		node.className.should.not.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('false');
	});

	it('closes when mousedown outside if rootCloseEvent set', () => {
		const wrapper = mount(
			<Dropdown id="test-id" rootCloseEvent="mousedown">
				{dropdownChildren}
			</Dropdown>,
		);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();

		node.className.should.not.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('false');

		ReactTestUtils.Simulate.click(buttonNode);

		node.className.should.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('true');

		// Use native events as the click doesn't have to be in the React portion
		const event = new MouseEvent('mousedown');
		document.dispatchEvent(event);

		node.className.should.not.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('false');
	});

	it('opens if dropdown contains no focusable menu item', () => {
		const wrapper = mount(
			<Dropdown title="custom child" id="dropdown">
				<Dropdown.Toggle>Toggle</Dropdown.Toggle>
				<Dropdown.Menu>
					<li>Some custom nonfocusable content</li>
				</Dropdown.Menu>
			</Dropdown>,
		);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();
		ReactTestUtils.Simulate.click(buttonNode);
		node.className.should.match(/\bopen\b/);
	});

	it('when focused and closed toggles open when the key "down" is pressed', () => {
		const wrapper = mount(simpleDropdown);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();

		ReactTestUtils.Simulate.keyDown(buttonNode, { key: 'ArrowDown' });

		node.className.should.match(/\bopen\b/);
		buttonNode.getAttribute('aria-expanded').should.equal('true');
	});

	it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
		const wrapper = mount(simpleDropdown);
		const buttonNode = wrapper.find('button').getDOMNode();

		buttonNode.getAttribute('aria-haspopup').should.equal('true');
	});

	it('does not pass onSelect to DOM node', () => {
		shallow(simpleDropdown)
			.setProps('onSelect', () => {})
			.find('div')
			.should.not.have.property('onSelect');
	});

	it('closes when child MenuItem is selected', () => {
		const wrapper = mount(simpleDropdown);
		const node = wrapper.getDOMNode();

		const buttonNode = wrapper.find('button').getDOMNode();
		ReactTestUtils.Simulate.click(buttonNode);
		node.className.should.match(/\bopen\b/);

		const menuItem = wrapper.find('a').first().getDOMNode();
		ReactTestUtils.Simulate.click(menuItem);
		node.className.should.not.match(/\bopen\b/);
	});

	it('does not close when onToggle is controlled', () => {
		const handleSelect = () => {};

		const wrapper = mount(
			<Dropdown open onToggle={handleSelect} id="test-id">
				{dropdownChildren}
			</Dropdown>,
		);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();
		const menuItem = wrapper.find('a').first().getDOMNode();

		ReactTestUtils.Simulate.click(buttonNode);
		node.className.should.match(/\bopen\b/);
		ReactTestUtils.Simulate.click(menuItem);

		node.className.should.match(/\bopen\b/);
	});

	it('is open with explicit prop', () => {
		class OpenProp extends React.Component {
			constructor(props) {
				super(props);

				this.state = {
					open: false,
				};
			}

			render() {
				return (
					<div>
						<button
							className="outer-button"
							onClick={() => this.setState({ open: !this.state.open })}
						>
							Outer button
						</button>
						<Dropdown
							open={this.state.open}
							onToggle={() => {}}
							title="Prop open control"
							id="test-id"
						>
							{dropdownChildren}
						</Dropdown>
					</div>
				);
			}
		}

		const instance = ReactTestUtils.renderIntoDocument(<OpenProp />);
		const outerToggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'outer-button');
		const dropdownNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown');

		dropdownNode.className.should.not.match(/\bopen\b/);
		ReactTestUtils.Simulate.click(outerToggle);
		dropdownNode.className.should.match(/\bopen\b/);
		ReactTestUtils.Simulate.click(outerToggle);
		dropdownNode.className.should.not.match(/\bopen\b/);
	});

	it('has aria-labelledby same id as toggle button', () => {
		const wrapper = mount(simpleDropdown);
		const node = wrapper.getDOMNode();
		const buttonNode = wrapper.find('button').getDOMNode();
		const menuNode = node.children[1];

		buttonNode.getAttribute('id').should.equal(menuNode.getAttribute('aria-labelledby'));
	});

	describe('PropType validation', () => {
		describe('children', () => {
			it('menu is exclusive', () => {
				shouldWarn('Duplicate children');
				shouldWarn('bsRole: menu');

				ReactTestUtils.renderIntoDocument(
					<Dropdown id="test">
						<Dropdown.Toggle />
						<Dropdown.Menu />
						<Dropdown.Menu />
					</Dropdown>,
				);
			});

			it('menu is required', () => {
				shouldWarn('Missing a required child');
				shouldWarn('bsRole: menu');

				// Dropdowns can't render without a menu.
				try {
					ReactTestUtils.renderIntoDocument(
						<Dropdown id="test">
							<Dropdown.Toggle />
						</Dropdown>,
					);
				} catch (e) {} // eslint-disable-line no-empty
			});

			it('toggles are not exclusive', () => {
				ReactTestUtils.renderIntoDocument(
					<Dropdown id="test">
						<Dropdown.Toggle />
						<Dropdown.Toggle />
						<Dropdown.Menu />
					</Dropdown>,
				);
			});

			it('toggle is required', () => {
				shouldWarn('Missing a required child');
				shouldWarn('bsRole: toggle');

				ReactTestUtils.renderIntoDocument(
					<Dropdown id="test">
						<Dropdown.Menu />
					</Dropdown>,
				);
			});
		});
	});

	it('chains refs', () => {
		class RefDropdown extends React.Component {
			render() {
				return (
					<Dropdown ref={dropdown => (this.dropdown = dropdown)} id="test">
						<Dropdown.Toggle ref={toggle => (this.toggle = toggle)} />
						<Dropdown.Menu ref={menu => (this.menu = menu)} />
					</Dropdown>
				);
			}
		}

		const inst = mount(<RefDropdown />).instance();

		inst.menu.should.exist;
		inst.dropdown.menu.should.exist;

		inst.toggle.should.exist;
		inst.dropdown.toggle.should.exist;
	});

	it('warns when a string ref is specified', () => {
		class RefDropdown extends React.Component {
			render() {
				return (
					<Dropdown id="test">
						<Dropdown.Toggle ref="toggle" />
						<Dropdown.Menu />
					</Dropdown>
				);
			}
		}

		shouldWarn('String refs are not supported');

		mount(<RefDropdown />);
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
			const wrapper = mount(simpleDropdown, { attachTo: focusableContainer });
			const buttonNode = wrapper.find('button').getDOMNode();
			buttonNode.focus();
			ReactTestUtils.Simulate.keyDown(buttonNode, { key: 'ArrowDown' });

			const firstMenuItemAnchor = wrapper.find('a').first().getDOMNode();
			document.activeElement.should.equal(firstMenuItemAnchor);
		});

		it('when focused and open does not toggle closed when the key "down" is pressed', () => {
			const wrapper = mount(simpleDropdown);
			const node = wrapper.getDOMNode();
			const buttonNode = wrapper.find('button').getDOMNode();

			ReactTestUtils.Simulate.click(buttonNode);
			ReactTestUtils.Simulate.keyDown(buttonNode, { key: 'ArrowDown' });

			node.className.should.match(/\bopen\b/);
			buttonNode.getAttribute('aria-expanded').should.equal('true');
		});

		// This test is more complicated then it appears to need. This is
		// because there was an intermittent failure of the test when not structured this way
		// The failure occurred when all tests in the suite were run together, but not a subset of the tests.
		//
		// I am fairly confident that the failure is due to a test specific conflict and not an actual bug.
		it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', () => {
			const wrapper = mount(
				<Dropdown defaultOpen role="menuitem" id="test-id">
					{dropdownChildren}
				</Dropdown>,
				{ attachTo: focusableContainer },
			);

			const buttonNode = wrapper.find('button').getDOMNode();
			const firstMenuItemAnchor = wrapper.find('a').first().getDOMNode();

			document.activeElement.should.equal(firstMenuItemAnchor);

			ReactTestUtils.Simulate.keyDown(firstMenuItemAnchor, {
				type: 'keydown',
				key: 'Escape',
			});

			document.activeElement.should.equal(buttonNode);
		});

		it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', done => {
			const wrapper = mount(
				<Grid>
					{simpleDropdown}
					<input type="text" id="next-focusable" />
				</Grid>,
				{ attachTo: focusableContainer },
			);
			const node = wrapper.find(Dropdown);
			const buttonNode = node.find('button').getDOMNode();

			ReactTestUtils.Simulate.click(buttonNode);
			buttonNode.getAttribute('aria-expanded').should.equal('true');

			ReactTestUtils.Simulate.keyDown(buttonNode, {
				key: 'Tab',
			});

			setTimeout(() => {
				buttonNode.getAttribute('aria-expanded').should.equal('false');
				done();
			});

			// simulating a tab event doesn't actually shift focus.
			// at least that seems to be the case according to SO.
			// hence no assert on the input having focus.
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
			const spy = sinon.spy();
			const wrapper = mount(
				<Dropdown id="test-id" onToggle={spy}>
					{dropdownChildren}
				</Dropdown>,
			);
			const buttonNode = wrapper.find('button').getDOMNode();

			expect(spy).to.not.have.been.called;

			ReactTestUtils.Simulate.click(buttonNode);

			expect(spy).to.have.been.calledOnce;
			expect(spy.getCall(0).args.length).to.equal(3);
			expect(spy.getCall(0).args[0]).to.equal(true);
			expect(spy.getCall(0).args[1]).to.be.an('object');
			assert.deepEqual(spy.getCall(0).args[2], { source: 'click' });
		});

		it('passes open, event, and source correctly when closed with click', () => {
			const spy = sinon.spy();
			const wrapper = mount(
				<Dropdown id="test-id" onToggle={spy}>
					{dropdownChildren}
				</Dropdown>,
			);
			const buttonNode = wrapper.find('button').getDOMNode();

			expect(spy).to.not.have.been.called;
			ReactTestUtils.Simulate.click(buttonNode);
			expect(spy).to.have.been.calledOnce;
			ReactTestUtils.Simulate.click(buttonNode);

			expect(spy).to.have.been.calledTwice;
			expect(spy.getCall(1).args.length).to.equal(3);
			expect(spy.getCall(1).args[0]).to.equal(false);
			expect(spy.getCall(1).args[1]).to.be.an('object');
			assert.deepEqual(spy.getCall(1).args[2], { source: 'click' });
		});

		it('passes open, event, and source correctly when child selected', () => {
			const spy = sinon.spy();
			const wrapper = mount(
				<Dropdown id="test-id" onToggle={spy}>
					<Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>
					<Dropdown.Menu key="menu">
						<MenuItem eventKey={1}>Item 1</MenuItem>
					</Dropdown.Menu>
				</Dropdown>,
			);
			const buttonNode = wrapper.find('button').getDOMNode();
			const childNode = wrapper.find('a').getDOMNode();

			expect(spy).to.not.have.been.called;
			ReactTestUtils.Simulate.click(buttonNode);
			expect(spy).to.have.been.calledOnce;

			ReactTestUtils.Simulate.click(childNode);

			expect(spy).to.have.been.calledTwice;
			expect(spy.getCall(1).args.length).to.equal(3);
			expect(spy.getCall(1).args[0]).to.equal(false);
			expect(spy.getCall(1).args[1]).to.be.an('object');
			assert.deepEqual(spy.getCall(1).args[2], { source: 'select' });
		});

		it('passes open, event, and source correctly when opened with keydown', () => {
			const spy = sinon.spy();
			const wrapper = mount(
				<Dropdown id="test-id" onToggle={spy}>
					{dropdownChildren}
				</Dropdown>,
			);
			const buttonNode = wrapper.find('button').getDOMNode();

			ReactTestUtils.Simulate.keyDown(buttonNode, {
				key: 'ArrowDown',
			});

			expect(spy).to.have.been.calledOnce;
			expect(spy.getCall(0).args.length).to.equal(3);
			expect(spy.getCall(0).args[0]).to.equal(true);
			expect(spy.getCall(0).args[1]).to.be.an('object');
			assert.deepEqual(spy.getCall(0).args[2], { source: 'keydown' });
		});
	});

	it('should derive bsClass from parent', () => {
		const wrapper = mount(
			<Dropdown bsClass="my-dropdown" id="test-id">
				<Dropdown.Toggle bsClass="my-toggle">Child Title</Dropdown.Toggle>
				<Dropdown.Menu bsClass="my-menu">
					<MenuItem>Item 1</MenuItem>
				</Dropdown.Menu>
			</Dropdown>,
		);

		expect(wrapper.exists('.my-dropdown-toggle')).to.be.true;
		expect(wrapper.exists('.my-dropdown-menu')).to.be.true;

		expect(wrapper.find('.my-toggle')).to.have.lengthOf(0);
		expect(wrapper.find('.my-menu')).to.have.lengthOf(0);
	});
});

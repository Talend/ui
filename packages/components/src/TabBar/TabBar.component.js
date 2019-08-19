/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import keycode from 'keycode';
import debounce from 'lodash/debounce';
import Datalist from '../Datalist';

class TabBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.shouldShowDropdown = this.shouldShowDropdown.bind(this);
		this.showNavBarAndTest = this.showNavBarAndTest.bind(this);
		this.state = {
			showDropdown: false,
		};
		this.resizeListener = window.addEventListener('resize', debounce(this.showNavBarAndTest, 200));
	}

	componentDidMount() {
		this.shouldShowDropdown();
	}

	componentDidUpdate() {
		if (!this.needsRefocus || !this.ref) {
			return;
		}

		const activeChild = ReactDOM.findDOMNode(this.ref).querySelector('[aria-selected=true]');
		if (activeChild) {
			activeChild.focus();
			this.needsRefocus = false;
		}
	}

	shouldShowDropdown() {
		const tabBarContainer = ReactDOM.findDOMNode(this.ref);
		if (tabBarContainer) {
			// There is a TabBar, test if the height of this TabBar is equal to the height of a nav item.
			const firstChild = tabBarContainer.querySelector('li:first-child');
			if (firstChild) {
				if (tabBarContainer.offsetHeight !== firstChild.offsetHeight) {
					this.setState({ showDropdown: true });
				}
			}
		} else {
			// There is no TabBar, show it to test if dropdown is needed
			this.setState({ showDropdown: false });
		}
	}

	/**
	 * Just show the navBar and test if there is enough width.
	 */
	showNavBarAndTest() {
		this.setState({ showDropdown: false });
		this.shouldShowDropdown();
	}

	handleSelect(selectedKey, event) {
		if (selectedKey !== this.props.selectedKey) {
			if (event) {
				event.preventDefault();
			}
			this.props.onSelect(event, this.props.items.find(({ key }) => selectedKey === key));
		}
	}

	handleKeyDown(event) {
		const { items } = this.props;
		switch (event.which) {
			case keycode.codes.home:
				this.needsRefocus = true;
				this.handleSelect(items[0].key, event);
				break;
			case keycode.codes.end:
				this.needsRefocus = true;
				this.handleSelect(items[items.length - 1].key, event);
				break;
			default:
				break;
		}
	}

	render() {
		const { className, id, items, selectedKey, children, generateChildId } = this.props;
		const hasChildren = children || items.some(item => item.children);
		const tabContent = hasChildren && (
			<Tab.Content>
				{items.map(item => (
					<Tab.Pane eventKey={item.key} key={item.key}>
						{item.children}
						{selectedKey === item.key ? children : null}
					</Tab.Pane>
				))}
			</Tab.Content>
		);
		if (this.state.showDropdown) {
			const dataListProps = {
				onChange: (event, item) => this.handleSelect(item.value, event),
				disabled: false,
				readOnly: false,
				multiSection: false,
				titleMap: items.map(item => ({
					name: item.label,
					value: item.key,
				})),
			};
			return (
				<React.Fragment>
					<Datalist {...dataListProps} />
					{tabContent}
				</React.Fragment>
			);
		}
		return (
			<Tab.Container
				id={id}
				activeKey={selectedKey}
				className={className}
				onSelect={this.handleSelect}
				onKeyDown={this.handleKeyDown}
				generateChildId={generateChildId}
			>
				<div>
					<Nav
						bsStyle="tabs"
						className="tc-tab-bar"
						ref={ref => {
							this.ref = ref;
						}}
					>
						{items.map(item => (
							<NavItem {...item} eventKey={item.key} componentClass="button">
								{item.label}
							</NavItem>
						))}
					</Nav>
					{tabContent}
				</div>
			</Tab.Container>
		);
	}
}

TabBar.displayName = 'TabBar';

TabBar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	generateChildId: PropTypes.func,
	id: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			key: PropTypes.any.isRequired,
			label: PropTypes.string.isRequired,
		}).isRequired,
	).isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedKey: PropTypes.any,
};

TabBar.Tab = Tab;

export default TabBar;

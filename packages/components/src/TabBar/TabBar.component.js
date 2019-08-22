/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import keycode from 'keycode';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import theme from './TabBar.scss';

class TabBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.shouldShowDropdown = this.shouldShowDropdown.bind(this);
		this.showTabBarAndTest = this.showTabBarAndTest.bind(this);
		this.state = {
			showDropdown: false,
		};
		this.tabBarContainerRef = React.createRef();
	}

	componentDidMount() {
		this.resizeListener = window.addEventListener('resize', debounce(this.showTabBarAndTest, 200));
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

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeListener);
	}

	shouldShowDropdown() {
		const tabContainer = this.tabBarContainerRef.current;
		if (tabContainer) {
			// There is a TabBar, test if the right boundary point of this TabBar
			// is closer than the right boundary point of its last nav item.
			const lastChild = this.tabBarContainerRef.current.querySelector('li:last-child');
			if (lastChild) {
				if (tabContainer.getBoundingClientRect().right < lastChild.getBoundingClientRect().right) {
					this.setState({ showDropdown: true });
				}
			}
		} else {
			// There is no TabBar, show it to test if dropdown is needed
			this.setState({ showDropdown: false });
		}
	}

	/**
	 * Just show the tabBar and test if there is enough width.
	 */
	showTabBarAndTest() {
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
			return (
				<React.Fragment>
					<form>
						<div className={theme['tc-responsive-tab-bar-select-container']}>
							<select
								onChange={event => this.handleSelect(event.target.value, event)}
								value={selectedKey}
							>
								{items.map(item => (
									<option value={item.key} key={item.key}>
										{item.label}
									</option>
								))}
							</select>
						</div>
					</form>
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
				<div ref={this.tabBarContainerRef}>
					<Nav
						bsStyle="tabs"
						className={classnames('tc-tab-bar', theme['tc-responsive-tab-bar'])}
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

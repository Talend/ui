/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import keycode from 'keycode';
import Datalist from '../Datalist';

class TabBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			showDropdown: false,
		};
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
		const container = ReactDOM.findDOMNode(this.ref);
		if (container) {
			const firstChild = container.querySelector('li:first-child');
			if (firstChild) {
				if (container.offsetHeight !== firstChild.offsetHeight) {
					this.setState({ showDropdown: true });
				}
			}
		}
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
		if (this.state.showDropdown) {
			const dataListProps = {
				onChange: this.handleSelect,
				disabled: false,
				readOnly: false,
				titleMap: items.map(item => ({
					name: item.label,
				})),
			};
			return (
				<React.Fragment>
					<Datalist {...dataListProps} />
					{hasChildren && (
						<Tab.Content>
							{items.map(item => (
								<Tab.Pane eventKey={item.key} key={item.key}>
									{item.children}
									{selectedKey === item.key ? children : null}
								</Tab.Pane>
							))}
						</Tab.Content>
					)}
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
					{hasChildren && (
						<Tab.Content>
							{items.map(item => (
								<Tab.Pane eventKey={item.key} key={item.key}>
									{item.children}
									{selectedKey === item.key ? children : null}
								</Tab.Pane>
							))}
						</Tab.Content>
					)}
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

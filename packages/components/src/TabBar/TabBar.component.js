/* eslint-disable react/no-find-dom-node */
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import keycode from 'keycode';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import theme from './TabBar.scss';

function TabBar(props) {
	const tabBarContainerRef = useRef();
	const tabBarRef = useRef();
	const needsRefocus = useRef();

	const [showDropdown, setShowDropDown] = useState(false);

	function tryShowDropdown() {
		const tabContainer = tabBarContainerRef.current;
		if (tabContainer) {
			// There is a TabBar, test if the right boundary point of this TabBar
			// is closer than the right boundary point of its last nav item.
			const lastChild = tabContainer.querySelector('li:last-child');
			if (lastChild) {
				if (tabContainer.getBoundingClientRect().right < lastChild.getBoundingClientRect().right) {
					setShowDropDown(true);
				}
			}
		} else {
			// There is no TabBar, show it to test if dropdown is needed
			setShowDropDown(false);
		}
	}

	/**
	 * Just show the tabBar and test if there is enough width.
	 */
	function showTabBarAndTest() {
		setShowDropDown(false);
		tryShowDropdown();
	}

	useEffect(() => {
		const resizeListener = window.addEventListener('resize', debounce(showTabBarAndTest, 200));
		return () => window.removeEventListener('resize', resizeListener);
	}, []);

	useEffect(() => {
		if (!needsRefocus || !tabBarRef.current) {
			return;
		}
		const tabBarRefNode = ReactDOM.findDOMNode(tabBarRef.current);
		if (tabBarRefNode && typeof tabBarRefNode.querySelector === 'function') {
			const activeChild = tabBarRefNode.querySelector('[aria-selected=true]');
			if (activeChild) {
				activeChild.focus();
				needsRefocus.current = false;
			}
		}
	});

	useEffect(() => {
		tryShowDropdown();
	}, []);

	const { onSelect } = props; // to avoid react/no-unused-prop-types
	function handleSelect(selectedKey, event) {
		if (selectedKey !== props.selectedKey) {
			if (event) {
				event.preventDefault();
			}
			onSelect(event, props.items.find(({ key }) => selectedKey === key));
		}
	}

	function handleKeyDown(event) {
		const { items } = props;
		switch (event.which) {
			case keycode.codes.home:
				needsRefocus.current = true;
				handleSelect(items[0].key, event);
				break;
			case keycode.codes.end:
				needsRefocus.current = true;
				handleSelect(items[items.length - 1].key, event);
				break;
			default:
				break;
		}
	}

	const { className, id, items, selectedKey, children, generateChildId } = props;
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

	if (showDropdown) {
		return (
			<React.Fragment>
				<form>
					<div className={theme['tc-responsive-tab-bar-select-container']}>
						<select onChange={event => handleSelect(event.target.value, event)} value={selectedKey}>
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
			onSelect={handleSelect}
			onKeyDown={handleKeyDown}
			generateChildId={generateChildId}
		>
			<div ref={tabBarContainerRef}>
				<Nav
					bsStyle="tabs"
					className={classnames('tc-tab-bar', theme['tc-responsive-tab-bar'])}
					ref={tabBarRef}
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

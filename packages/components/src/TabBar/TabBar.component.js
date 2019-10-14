/* eslint-disable react/no-find-dom-node */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { OverlayTrigger } from 'react-bootstrap';
import keycode from 'keycode';
import debounce from 'lodash/debounce';
import classnames from 'classnames';

import Icon from '../Icon';
import TooltipTrigger from '../TooltipTrigger';
import { ActionDropdown } from '../Actions';

import theme from './TabBar.scss';

function TabBar(props) {
	const tabBarContainerRef = useRef();
	const tabBarRef = useRef();
	const needsRefocus = useRef();

	const [showDropdown, setShowDropDown] = useState(false);

	const { responsive = true } = props;

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
		if (responsive) {
			const resizeListener = window.addEventListener('resize', debounce(showTabBarAndTest, 200));
			return () => window.removeEventListener('resize', resizeListener);
		}
		return undefined;
	}, []);

	useEffect(() => {
		if (!needsRefocus.current || !tabBarRef.current) {
			return;
		}
		const tabBarRefNode = ReactDOM.findDOMNode(tabBarRef.current);
		if (tabBarRefNode && typeof tabBarRefNode.querySelector === 'function') {
			const activeChild = tabBarRefNode.querySelector('[aria-selected=true]');
			if (activeChild) {
				activeChild.focus({ preventScroll: true });
				needsRefocus.current = false;
			}
		}
	});

	useEffect(() => {
		if (responsive) {
			tryShowDropdown();
		}
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
	if (responsive && showDropdown) {
		const selectedItem = items[selectedKey - 1];
		return (
			<React.Fragment>
				<ActionDropdown
					className={classnames(theme['tc-tab-bar-dropdown'], 'tc-tab-bar-dropdown')}
					label={selectedItem.label}
					icon={selectedItem.icon && selectedItem.icon.name}
					onSelect={(event, { key }) => handleSelect(key, event)}
					items={items.map(item => ({
						...item,
						icon: item.icon && item.icon.name,
					}))}
					link
				/>
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
					className={classnames(
						theme['tc-tab-bar'],
						'tc-tab-bar',
						responsive && theme['tc-tab-bar-responsive'],
						responsive && 'tc-tab-bar-responsive',
					)}
					ref={tabBarRef}
				>
					{items.map(({ icon, ...item }) => (
						<NavItem
							className={classnames(theme['tc-tab-bar-item'], 'tc-tab-bar-item')}
							{...item}
							eventKey={item.key}
							componentClass="button"
						>
							<TooltipTrigger label={item.label} tooltipPlacement={props.tooltipPlacement}>
								<React.Fragment>
									{icon && (
										<Icon
											className={classnames(theme['tc-tab-bar-item-icon'], 'tc-tab-bar-item-icon')}
											{...icon}
										/>
									)}
									{item.label}
								</React.Fragment>
							</TooltipTrigger>
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
			icon: PropTypes.string,
		}).isRequired,
	).isRequired,
	onSelect: PropTypes.func.isRequired,
	responsive: PropTypes.bool,
	selectedKey: PropTypes.any,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

TabBar.defaultProps = {
	tooltipPlacement: 'top',
};

TabBar.Tab = Tab;

export default TabBar;

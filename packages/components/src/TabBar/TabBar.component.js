import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import theme from './TabBar.scss';

function Tab({ item, onClick, isSelected }) {
	const onSelect = (event) => {
		onClick(event, item);
	};
	return (
		<li className={classNames(['tc-tab-bar-action', isSelected && 'active'])} >
			<Action
				bsStyle="link"
				id={item.id}
				label={item.label}
				onClick={onSelect}
			/>
		</li>
	);
}

Tab.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
		key: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
	isSelected: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

function TabBar({ items, onSelect, selected, className }) {
	return (
		<nav className={classNames(['nav', 'tc-tab-bar', className, theme['tc-tab-bar']])}>
			<ul className="nav nav-tabs tc-tab-bar-actions">
				{items.map(item => (
					<Tab key={item.key} onClick={onSelect} isSelected={selected === item.key} item={item} />
				))}
			</ul>
		</nav>
	);
}

TabBar.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		key: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	})).isRequired,
	onSelect: PropTypes.func.isRequired,
	selected: PropTypes.string,
	className: PropTypes.string,
};

TabBar.Tab = Tab;

export default TabBar;

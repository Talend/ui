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
	item: React.PropTypes.shape({
		id: React.PropTypes.string,
		key: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
	}).isRequired,
	isSelected: React.PropTypes.bool,
	onClick: React.PropTypes.func.isRequired,
};

function TabBar({ items, onSelect, selected }) {
	return (
		<nav className={classNames(['nav', 'tc-tab-bar', theme['tc-tab-bar']])}>
			<ul className="nav nav-tabs tc-tab-bar-actions">
				{items.map(item => (
					<Tab key={item.key} onClick={onSelect} isSelected={selected === item.key} item={item} />
				))}
			</ul>
		</nav>
	);
}

TabBar.propTypes = {
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		id: React.PropTypes.string,
		key: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
	})).isRequired,
	onSelect: React.PropTypes.func.isRequired,
	selected: React.PropTypes.string,
};

TabBar.Tab = Tab;

export default TabBar;

import React from 'react';
import classNames from 'classnames';

import Item from './Item';
import Column from './Column.properties';
import theme from './Items.scss';

function Items(props) {
	const {
		id,
		displayMode,
		columns,
		items,
		itemProps,
		titleProps,
	} = props;
	const itemsClasses = classNames(theme['tc-list-items'], 'tc-list-items', theme[displayMode], displayMode);
	const iconColumn = columns.find(column => column.type === 'icon');
	const titleColumn = columns.find(column => column.key === titleProps.key);
	const textColumns = columns.filter(column => !column.type || column.type === 'text');
	return (
		<div>
			<ul className={itemsClasses}>
				<li className="tc-list-header">
					{iconColumn && <div className="tc-list-header-item tc-list-header-icon" />}
					{titleColumn && (<div className="tc-list-header-item tc-list-header-title">{titleColumn.label}</div>)}
					{textColumns.map((column, index) => (
						<div key={index} className="tc-list-header-item tc-list-header-text">{column.label}</div>
					))}
				</li>
				{items.map((item, index) => (
					<li key={index}>
						<Item
							id={id && `${id}-${index}`}
							columns={columns}
							item={item}
							itemProps={itemProps}
							titleProps={titleProps}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

Items.propTypes = {
	id: React.PropTypes.string,
	displayMode: React.PropTypes.string,
	columns: React.PropTypes.arrayOf(Column.propTypes).isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.object),
	itemProps: Item.propTypes.itemProps,
	titleProps: Item.propTypes.titleProps,
};

Items.defaultProps = {
	items: [],
	displayMode: 'table',
	titleProps: { key: 'name' },
};

export default Items;

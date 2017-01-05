import React from 'react';
import classNames from 'classnames';

import Item from './Item';
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
	const titleColumn = columns.find(column => column.key === titleProps.key);
	const columnsWithoutTitle = columns.filter(column => column.key !== titleProps.key);
	const itemsClasses = classNames(theme['tc-list-items'], 'tc-list-items', theme[displayMode], displayMode);
	return (
		<div>
			<ul className={itemsClasses}>
				<li className="tc-list-header">
					{titleColumn && (<div className="tc-list-header-item">{titleColumn.label}</div>)}
					{columnsWithoutTitle.map((column, index) => (
						<div key={index} className="tc-list-header-item">{column.label}</div>
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
	columns: React.PropTypes.arrayOf(React.PropTypes.object),
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

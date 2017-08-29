import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Item from './Item';
import Column from './Column.properties';
import theme from './Content.scss';

function Content(props) {
	const {
		id,
		displayMode,
		columns,
		actions,
		items,
		itemProps,
	} = props;
	const itemsClasses = classNames(theme['tc-list-content'], 'tc-list-content', theme[displayMode], displayMode);
	return (
		<div>
			<ul className={itemsClasses}>
				<li className="tc-list-header">
					{itemProps.onSelect && itemProps.isSelected && (<div className="tc-list-header-item action" />)}
					{columns.map((column, index) => (
						<div key={index} className={classNames('tc-list-header-item', column.type || 'text')}>
							{column.label}
						</div>
					))}
				</li>
				{items.map((item, index) => (
					<li key={index}>
						<Item
							id={id && `${id}-${index}`}
							columns={columns}
							actions={actions}
							item={item}
							itemProps={itemProps}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

Content.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	columns: PropTypes.arrayOf(Column.propTypes).isRequired,
	actions: Item.propTypes.actions,
	items: PropTypes.arrayOf(PropTypes.object),
	itemProps: Item.propTypes.itemProps,
};

Content.defaultProps = {
	items: [],
	displayMode: 'table',
	itemProps: {},
};

export default Content;

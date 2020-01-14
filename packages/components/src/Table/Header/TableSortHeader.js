import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ActionButton from '../../Actions/ActionButton';

function getIcon(sorter) {
	return sorter.icons && sorter.icons[sorter.direction];
}

/**
 * This component displays a header of a table column as an ActionButton.
 * It is used for column with sorter.
 */
export default class TableSortHeader extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.onSortChange(this.props.column.key);
	}

	render() {
		const { className, column, sorter } = this.props;
		const { icon, label, ...rest } = column.headExtraProps || {};
		return (
			<ActionButton
				className={classnames('tc-table-sort-header', className)}
				label={column.label || label}
				onClick={this.onClick}
				icon={getIcon(sorter) || icon}
				{...rest}
			/>
		);
	}
}

TableSortHeader.propTypes = {
	className: PropTypes.string,
	column: PropTypes.object,
	sorter: PropTypes.object,
	onSortChange: PropTypes.func,
};

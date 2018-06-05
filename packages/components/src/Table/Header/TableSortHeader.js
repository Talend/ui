import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ActionButton } from '../../index';

/**
 * This component displays a header of a table column as an ActionButton.
 * The action props { label } can be provided by data or by extra.label.
 * The other action props { icon, onClick, etc } are provided by extra props.
 *
 */
export default class TableSortHeader extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.onSortChange(this.props.column.sorter);
	}

	render() {
		const { className, column } = this.props;
		const {	icon, label, onClick, ...rest } = column.headExtraProps;
		const sorter = column.sorter;
		return (
			<ActionButton
				className={classNames('tc-table-sort-header',  className)}
				label={column.label || label || sorter.getLabel()}
				onClick={this.onClick}
				icon={sorter.getIcon() || icon}
				{...rest}
			/>
		);
	}
}

TableSortHeader.propTypes = {
	className: PropTypes.string,
	column: PropTypes.object,
	onSortChange: PropTypes.func,
};

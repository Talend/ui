import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import theme from './CellCheckbox.scss';

/**
 * Cell renderer that displays a checkbox
 */
class CellCheckbox extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.cellData !== nextProps.cellData ||
			this.props.columnData !== nextProps.columnData ||
			this.props.rowData !== nextProps.rowData ||
			this.props.rowIndex !== nextProps.rowIndex
		);
	}

	render() {
		const { cellData, columnData, rowData, rowIndex } = this.props;
		const { id, label, onChange } = columnData;
		return (
			<form className={classnames('tc-list-checkbox', theme['tc-list-checkbox'])}>
				<div className="checkbox">
					<label htmlFor={id && `${id}-${rowIndex}-check`}>
						<input
							id={id && `${id}-${rowIndex}-check`}
							type="checkbox"
							onChange={e => {
								onChange(e, rowData);
							}}
							checked={cellData}
						/>
						<span className={'tc-cell-checkbox'}>
							<span className="sr-only">{label}</span>
						</span>
					</label>
				</div>
			</form>
		);
	}
}

CellCheckbox.displayName = 'VirtualizedList(CellCheckbox)';
CellCheckbox.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The custom props passed to <VirtualizedList.Content columnData={}>.
	columnData: PropTypes.shape({
		// The List id. This is used as the checkbox id prefix.
		id: PropTypes.string,
		// The checkbox label.
		label: PropTypes.string,
		// The onChange callback triggered on checkbox toggle.
		onChange: PropTypes.func.isRequired,
	}),
	// The collection item.
	rowData: PropTypes.object, // eslint-disable-line
	// The collection item index.
	rowIndex: PropTypes.number,
};

export default CellCheckbox;

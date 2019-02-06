import React from 'react';
import PropTypes from 'prop-types';
// import cloneDeep from 'lodash/cloneDeep';

const createColumnChooserData = column => {
	return {
		hidden: column.hidden,
		label: column.label,
		locked: column.locked,
		order: column.order,
	};
};

export default class ColumnChooserManager extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		children: PropTypes.func.isRequired,
		columns: PropTypes.array.isRequired,
		handlerColumnChooser: PropTypes.func.isRequired,
	};

	state = {
		// columns: this.props.columns,
		// editedColumns: cloneDeep(this.props.columns),
		editedColumns: this.props.columns && this.props.columns.map(createColumnChooserData),
	};

	onClickModify = event => {
		this.setState(
			prevState => {
				return {
					editedColumns: prevState.editedColumns,
				};
			},
			() => this.props.handlerColumnChooser(event, this.state.editedColumns),
		);
	};

	onChangeVisibilityColumn = (index, hidden) => {
		this.setState(prevState => {
			const editedColumns = prevState.editedColumns;
			editedColumns[index].hidden = hidden;
			return { editedColumns };
		});
	};

	onChangeOrderColumn = (event, index) => {
		const value = event.target.value;
		this.setState(prevState => {
			const editedColumns = prevState.editedColumns;
			editedColumns[index].order = value;
			return { editedColumns };
		});
	};

	getColumns() {
		return this.state.editedColumns;
	}

	reset = () => {
		this.props.handlerColumnChooser(event, this.props.columns);
	};

	render() {
		const { children } = this.props;
		if (typeof children !== 'function') {
			throw new Error('ColumnChooser manager needs to have children as function');
		}
		return children({
			columnChooserId: this.props.id,
			columns: this.getColumns(),
			onClickModify: this.onClickModify,
			onChangeVisibilityColumn: this.onChangeVisibilityColumn,
			onChangeOrderColumn: this.onChangeOrderColumn,
			reset: this.reset,
		});
	}
}

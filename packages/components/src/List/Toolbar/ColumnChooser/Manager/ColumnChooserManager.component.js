import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

export default class ColumnChooserManager extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		columns: PropTypes.array.isRequired,
		handlerColumnChooser: PropTypes.func.isRequired,
	};

	state = {
		columns: this.props.columns,
		editedColumns: cloneDeep(this.props.columns),
	};

	onClickModify = event => {
		this.setState(
			prevState => {
				return {
					columns: prevState.editedColumns,
				};
			},
			() => this.props.handlerColumnChooser(event, this.state.columns),
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
		return this.props.columns || this.state.editedColumns;
	}

	reset = () => {
		this.props.handlerColumnChooser(event, this.props.columns);
	};

	render() {
		if (typeof this.props.children !== 'function') {
			throw new Error('Bad juju');
		}
		console.log('props', this.props);

		return this.props.children({
			columnChooserId: this.props.id,
			columns: this.getColumns(),
			onClickModify: this.onClickModify,
			onChangeVisibilityColumn: this.onChangeVisibilityColumn,
			onChangeOrderColumn: this.onChangeOrderColumn,
			reset: this.reset,
		});
	}
}

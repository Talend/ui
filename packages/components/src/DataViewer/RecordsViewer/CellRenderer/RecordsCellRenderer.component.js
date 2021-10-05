import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from '../../Core';

export default class RecordsCellRenderer extends React.Component {
	static propTypes = {
		highlighted: PropTypes.array,
		index: PropTypes.number.isRequired,
		isAllExpanded: PropTypes.bool,
		measure: PropTypes.func.isRequired,
		onToggle: PropTypes.func,
		paths: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		value: PropTypes.array.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		// this is necessary to avoid an infinite call stack
		// componentDidUpdate --> measure --> List render --> componentDidUpdate --> ...
		return (
			nextProps.paths[nextProps.index] !== this.props.paths[this.props.index] ||
			nextProps.value[nextProps.index] !== this.props.value[this.props.index] ||
			nextProps.highlighted !== this.props.highlighted ||
			nextProps.isAllExpanded !== this.props.isAllExpanded
		);
	}

	componentDidUpdate() {
		// after data update or toggle update, the height has changed
		// triggers the CellMesurer to update height of this cell
		this.props.measure();
	}

	onToggleCell = (event, options) => {
		this.props.onToggle(event, options, this.props.index);
	};

	render() {
		const { index, value } = this.props;
		return (
			<Tree
				{...this.props}
				dataKey={index}
				jsonpath="$"
				level={0}
				onToggle={this.onToggleCell}
				type="object"
				value={value[index]}
			/>
		);
	}
}

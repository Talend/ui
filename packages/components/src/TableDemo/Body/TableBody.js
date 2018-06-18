import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableRow, { getRowId } from '../Row/TableRow.js';
import theme from './TableBody.scss';

const PART = 'body';

/**
 * This component displays the body of the table. It is responsible for rendering the rows.
 */
export default class TableBody extends React.Component {
	constructor(props) {
		super(props);
		this.updateBodyNodeRef = this.updateBodyNodeRef.bind(this);
	}

	componentDidMount() {
		if (this.props.renderingListener && this.props.renderingListener.onMounted) {
			this.props.renderingListener.onMounted(PART, this.bodyNode);
		}
	}

	componentDidUpdate() {
		if (this.props.renderingListener && this.props.renderingListener.onUpdated) {
			this.props.renderingListener.onUpdated(PART, this.bodyNode);
		}
	}

	updateBodyNodeRef(ref) {
		this.bodyNode = ref;
	}

	render() {
		const {
			elements,
			columns,
			classNames,
			rowDataGetter,
			onScroll,
			onEnterRow,
			onLeaveRow,
		} = this.props;
		const bodyClassName = classnames(
			'tc-table-body',
			theme['tc-table-body'],
			classNames && classNames.body,
		);
		return (
			<tbody
				ref={this.updateBodyNodeRef}
				className={bodyClassName}
				onScroll={onScroll}
			>
				{elements.map((element, index) => (
					<TableRow
						key={getRowId(rowDataGetter, element, index)}
						element={element}
						index={index}
						classNames={classNames}
						columns={columns}
						rowDataGetter={rowDataGetter}
						onEnterRow={onEnterRow}
						onLeaveRow={onLeaveRow}
					/>
				))}
			</tbody>
		);
	}
}

TableBody.propTypes = {
	elements: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	classNames: PropTypes.shape({
		body: PropTypes.string,
	}),
	rowDataGetter: PropTypes.object,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
	renderingListener: PropTypes.shape({
		onMounted: PropTypes.func,
		onUpdated: PropTypes.func,
	}),
};

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableHeader from '../Header/TableHeader';
import TableBody from '../Body/TableBody';
import theme from './TableComp.scss';

const PART = 'table';

/**
 * This component is responsible for rendering the table (i.e. head and body)
 */
export default class TableComp extends React.Component {

	constructor(props) {
		super(props);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
	}

	componentDidMount() {
		if (this.props.renderingListener && this.props.renderingListener.onMounted) {
			this.props.renderingListener.onMounted(PART, this.tableNode);
		}
	}

	componentDidUpdate() {
		if (this.props.renderingListener && this.props.renderingListener.onUpdated) {
			this.props.renderingListener.onUpdated(PART, this.tableNode);
		}
	}

	updateTableNodeRef(ref) {
		this.tableNode = ref;
	}

	render() {
		const {
			elements,
			columns,
			classNames,
			withHeader,
			sorters,
			onSortChange,
			onScroll,
			onEnterRow,
			onLeaveRow,
			renderingListener,
		} = this.props;
		return (
			<table
				ref={this.updateTableNodeRef}
				className={classnames('tc-table', theme['tc-table'], classNames && classNames.table)}
			>
				{withHeader && (
					<TableHeader
						columns={columns}
						classNames={classNames}
						sorters={sorters}
						onSortChange={onSortChange}
						renderingListener={renderingListener}
					/>
				)}
				<TableBody
					elements={elements}
					columns={columns}
					classNames={classNames}
					onScroll={onScroll}
					onEnterRow={onEnterRow}
					onLeaveRow={onLeaveRow}
					renderingListener={renderingListener}
				/>
			</table>
		);
	}
}

TableComp.propTypes = {
	elements: PropTypes.array.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string,
			headClassName: PropTypes.string,
			headRenderer: PropTypes.func,
			headExtraProps: PropTypes.object,
			cellClassName: PropTypes.string,
			cellRenderer: PropTypes.func,
			cellExtraProps: PropTypes.object,
		}),
	).isRequired,
	classNames: PropTypes.shape({
		table: PropTypes.string,
	}),
	withHeader: PropTypes.bool,
	sorters: PropTypes.object,
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
	renderingListener: PropTypes.shape({
		onMounted: PropTypes.func,
		onUpdated: PropTypes.func,
	}),
};

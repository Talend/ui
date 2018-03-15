import React from 'react';
import { AutoSizer, CellMeasurerCache, List } from 'react-virtualized';
import PropTypes from 'prop-types';

import RecordRenderer from './RecordRederer.component';

export default class Records extends React.Component {
	constructor(props) {
		super(props);
		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			minHeight: 40,
		});
	}

	render() {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<List
						cache={this.cache}
						data={this.props.data}
						deferredMeasurementCache={this.cache}
						height={height}
						highlighted={this.props.highlighted}
						opened={this.props.opened}
						onRowItemToggle={this.props.onToggle}
						rowCount={this.props.data.length}
						rowHeight={this.cache.rowHeight}
						rowRenderer={RecordRenderer}
						schema={this.props.schema}
						width={width}
					/>
				)}
			</AutoSizer>
		);
	}
}
Records.defaultProps = {
	data: [],
};
Records.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	highlighted: PropTypes.arrayOf(PropTypes.string),
	onToggle: PropTypes.func,
	opened: PropTypes.array,
	schema: PropTypes.object,
};

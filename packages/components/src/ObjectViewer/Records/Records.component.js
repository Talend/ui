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
						rowCount={this.props.data.length}
						onRowItemToggle={this.props.onToggle}
						rowHeight={this.cache.rowHeight}
						rowRenderer={RecordRenderer}
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
	opened: PropTypes.array,
	onToggle: PropTypes.func,
};

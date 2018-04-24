import React from 'react';
import { AutoSizer, CellMeasurerCache, List } from 'react-virtualized';
import PropTypes from 'prop-types';
import RecordRenderer from './RecordRenderer.component';

const MIN_HEIGHT = 40;

export default class Records extends React.Component {
	constructor(props) {
		super(props);
		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			minHeight: MIN_HEIGHT,
		});
	}

	render() {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<List
						avroRenderersIds={this.props.avroRenderersIds}
						cache={this.cache}
						data={this.props.data}
						deferredMeasurementCache={this.cache}
						getComponent={this.props.getComponent}
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
	avroRenderersIds: PropTypes.object,
	data: PropTypes.arrayOf(PropTypes.object),
	getComponent: PropTypes.func,
	highlighted: PropTypes.arrayOf(PropTypes.string),
	onToggle: PropTypes.func,
	opened: PropTypes.array,
	schema: PropTypes.array,
};

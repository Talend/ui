import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchemaName from './SchemaName';

function renderFilter(filter, filterComponents, onFilterChange, side) {
	const FilterComponent = filterComponents.get(filter.getId());
	if (FilterComponent) {
		return (
			<FilterComponent
				key={`${filter.getId()}-${side}`}
				filter={filter}
				onFilterChange={onFilterChange}
			/>
		);
	}
	return <div>{`Filter ${filter.getId()} cannot be rendered`}</div>;
}

export default class SchemaHeader extends Component {
	constructor(props) {
		super(props);
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	onFilterChange(filter) {
		this.props.onFilterChange(this.props.side, filter);
	}

	render() {
		const { dataAccessor, schema, side, filters, filterComponents } = this.props;
		return (
			<div className={`schema-header ${side}`}>
				<SchemaName dataAccessor={dataAccessor} schema={schema} side={side} />
				{
					filters.map(filter =>
						renderFilter(filter, filterComponents, this.onFilterChange, side))
				}
			</div>
		);
	}
}

SchemaHeader.propTypes = {
	dataAccessor: PropTypes.object,
	schema: PropTypes.object,
	side: PropTypes.string,
	filters: PropTypes.array,
	filterComponents: PropTypes.object,
	onFilterChange: PropTypes.func,
};

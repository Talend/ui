import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FilterBar from '../../FilterBar';

/**
 * Component used with a filter based on string value. It displays a FilterBar component.
 */
export default class StringFilterComponent extends Component {
	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.onFilter = this.onFilter.bind(this);
	}

	onToggle() {
		const params = {
			value: null,
			docked: !this.props.filter.params.docked,
		};
		this.props.onFilterChange(this.props.filter.id, false, params);
	}

	onFilter(ev, value) {
		const params = {
			value,
			docked: this.props.filter.params.docked,
		};
		this.props.onFilterChange(this.props.filter.id, Boolean(value), params);
	}

	render() {
		const { className, placeHolder, dockable, navbar } = this.props;
		return (
			<FilterBar
				className={classnames('tc-string-filter', className)}
				placeholder={placeHolder}
				dockable={dockable}
				docked={this.props.filter.params.docked}
				navbar={navbar}
				onToggle={this.onToggle}
				onFilter={this.onFilter}
			/>
		);
	}
}

StringFilterComponent.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
	className: PropTypes.string,
	placeHolder: PropTypes.string,
	dockable: PropTypes.bool,
	navbar: PropTypes.bool,
};

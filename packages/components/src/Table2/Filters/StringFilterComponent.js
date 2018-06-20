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
		this.state = { docked: true };
		this.onToggle = this.onToggle.bind(this);
		this.onFilter = this.onFilter.bind(this);
	}

	onToggle() {
		this.setState(prevState => ({
			docked: !prevState.docked,
		}));
		this.props.onFilterChange(this.props.filter.id, false, { value: null });
	}

	onFilter(ev, value) {
		this.props.onFilterChange(this.props.filter.id, Boolean(value), { value });
	}

	render() {
		const { className, placeHolder, dockable, navbar } = this.props;
		return (
			<FilterBar
				className={classnames('tc-string-filter', className)}
				placeholder={placeHolder}
				dockable={dockable}
				docked={this.state.docked}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterBar from '../../FilterBar';

function getClassName(extra) {
  if (extra && extra.className) {
    return extra.className;
  }
  return '';
}

function getPlaceHolder(extra) {
  if (extra && extra.placeHolder) {
    return extra.placeHolder;
  }
  return '...';
}

function isDockable(extra) {
  if (extra && extra.dockable) {
    return extra.dockable;
  }
  return true;
}

function isNavbar(extra) {
  if (extra && extra.navbar) {
    return extra.navbar;
  }
  return true;
}

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
		this.props.filter.setActive(false);
		this.props.filter.setValue(null);
		this.setState(prevState => ({
			docked: !prevState.docked,
		}));
		if (!this.state.docked) {
			this.props.onFilterChange(this.props.filter);
		}
	}

	onFilter(ev, value) {
		this.props.filter.setActive(value);
		this.props.filter.setValue(value);
		this.props.onFilterChange(this.props.filter);
	}

	render() {
    const { extra, className } = this.props;
		return (
			<FilterBar
				className={`tc-string-filter ${className} ${getClassName(extra)}`}
				placeholder={getPlaceHolder(extra)}
				dockable={isDockable(extra)}
				docked={this.state.docked}
				navbar={isNavbar(extra)}
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
  extra: PropTypes.object,
};

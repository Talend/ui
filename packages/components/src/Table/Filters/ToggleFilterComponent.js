import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../../Toggle';

function getClassName(extra) {
  if (extra && extra.className) {
    return extra.className;
  }
  return '';
}

function getLabel(extra) {
  if (extra && extra.label) {
    return extra.label;
  }
  return '';
}

/**
 * Component used with a filter based on boolean value.
 * It displays a toggle button with a label.
 */
export default class ToggleFilterComponent extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange() {
		const active = this.props.filter.isActive();
		this.props.filter.setActive(!active);
		this.props.onFilterChange(this.props.filter);
	}

	render() {
		const { filter, extra, className } = this.props;
		return (
			<Toggle
      	className={`tc-boolean-filter ${className} ${getClassName(extra)}`}
				onChange={this.onChange}
				label={getLabel(extra)}
				checked={filter.isActive()}
			/>
		);
	}
}

ToggleFilterComponent.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
  className: PropTypes.string,
  extra: PropTypes.shape({
		className: PropTypes.string,
		label: PropTypes.string,
	}),
};

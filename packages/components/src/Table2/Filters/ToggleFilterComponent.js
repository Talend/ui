import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Toggle from '../../Toggle';

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
		const { filter } = this.props;
		this.props.onFilterChange(filter.id, !filter.active);
	}

	render() {
		const { filter, label, className } = this.props;
		return (
			<Toggle
				className={classnames('tc-boolean-filter', className)}
				onChange={this.onChange}
				label={label}
				checked={filter.active}
				id={filter.id}
			/>
		);
	}
}

ToggleFilterComponent.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
	className: PropTypes.string,
	label: PropTypes.string,
};

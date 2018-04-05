import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../../../Toggle';

/**
* Component used for the MandatoryFieldFilter filter.
* It displays a toggle button with a label.
*/
export default class MandatoryFieldFilterComponent extends Component {
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
		const { filter } = this.props;
		return (
			<Toggle
				id="show-mandatory-fields"
				onChange={this.onChange}
				label="Show Mandatory Fields (*) Only"
				checked={filter.isActive()}
			/>
		);
	}
}

MandatoryFieldFilterComponent.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
};

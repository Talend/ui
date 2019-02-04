import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This component handle some specifics case like when we click in the datalist
 * We loose the focus on the datalist field but we don't want to close the suggestions
 * until we click outside of the component
 */
export default class FocusManager extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		onFocusOut: PropTypes.func.isRequired,
	};

	onJSOFocus() {
		clearTimeout(this.timeout);
	}

	onJSOBlur() {
		this.timeout = setTimeout(() => this.props.onFocusOut());
	}

	render() {
		return (
			<div tabIndex={0} onBlur={() => this.onJSOBlur()} onFocus={() => this.onJSOFocus()}>
				{this.props.children}
			</div>
		);
	}
}

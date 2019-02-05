import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This component handles some specific cases like when we click in the datalist
 * We loose the focus on the datalist field but we don't want to close the suggestions
 * until we click outside of the component
 * @example Here, the resetSuggestions function contains the code we can use in a classic "blur"
<FocusManager onFocusOut={this.resetSuggestions}>
	<Typeahead />
</FocusManager>
 */
export default class FocusManager extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		onFocusOut: PropTypes.func.isRequired,
	};

	onFocus = () => {
		clearTimeout(this.timeout);
	};

	onBlur = () => {
		this.timeout = setTimeout(() => this.props.onFocusOut());
	};

	render() {
		return (
			<div tabIndex={0} onBlur={this.onBlur} onFocus={this.onFocus}>
				{this.props.children}
			</div>
		);
	}
}

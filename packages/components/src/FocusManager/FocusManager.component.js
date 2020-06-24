import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

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
		onFocusOut: PropTypes.func,
		onFocusIn: PropTypes.func,
		divRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	};

	onFocus = event => {
		clearTimeout(this.timeout);
		if (this.props.onFocusIn) {
			this.props.onFocusIn(event);
		}
	};

	onBlur = event => {
		if (this.props.onFocusOut) {
			this.timeout = setTimeout(() => this.props.onFocusOut(event));
		}
	};

	render() {
		return (
			<div
				{...omit(this.props, ['onFocusOut', 'onFocusIn', 'divRef'])}
				ref={this.props.divRef}
				tabIndex={-1}
				onBlur={this.onBlur}
				onFocus={this.onFocus}
			/>
		);
	}
}

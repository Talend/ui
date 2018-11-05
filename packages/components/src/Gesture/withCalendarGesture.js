import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';

function focusOn(event, element) {
	if (element) {
		element.focus();
	}
}

export default function withCalendarGesture(WrappedComponent) {
	class CalendarGesture extends React.Component {
		constructor(props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		onKeyDown(event) {
			switch (event.keyCode) {
				case keycode.codes.left:
				case keycode.codes.right:
					event.stopPropagation();
					this.props.onSelect(event, item);
					break;
				case keycode.codes.up:
				case keycode.codes.down:
					event.stopPropagation();
					focusOn(event, getNextItem(ref));
					break;
				default:
					break;
			}
			if (event.nativeEvent.key === '*') {
				event.stopPropagation();
				this.props.onToggleAllSiblings(event, siblings);
			}
		}

		render() {
			return <WrappedComponent {...this.props} onKeyDown={this.onKeyDown} />;
		}
	}

	CalendarGesture.propTypes = {
		...omit(WrappedComponent.propTypes, 'onKeyDown'),
		// onSelect: PropTypes.func.isRequired,
		// onToggle: PropTypes.func.isRequired,
		// onToggleAllSiblings: PropTypes.func.isRequired,
	};
	CalendarGesture.displayName = `TreeGesture(${WrappedComponent.displayName})`;

	return CalendarGesture;
}

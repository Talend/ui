import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

function focusOn(element) {
	if (element) {
		element.focus();
	}
}

function getAllItems(ref) {
	return ref.querySelectorAll('li > button');
}

function focusOnListItem(ref, index) {
	const listItem = getAllItems(ref)[index];
	focusOn(listItem);
}

function focusOnPreviousItem(ref, { index, size }, goToPreviousPage) {
	const nextIndex = index - 1;
	if (nextIndex < 0) {
		goToPreviousPage(() => focusOnListItem(ref, size - 1));
	}
	focusOnListItem(ref, nextIndex);
}

function focusOnNextItem(ref, { index, size }, goToNextPage) {
	const nextIndex = index + 1;
	if (nextIndex >= size) {
		goToNextPage(() => focusOnListItem(ref, 0));
	}
	focusOnListItem(ref, nextIndex);
}

function focusOnNextPage(ref, { index }, goToNextPage) {
	goToNextPage(() => focusOnListItem(ref, index));
}

function focusOnPreviousPage(ref, { index }, goToPreviousPage) {
	goToPreviousPage(() => focusOnListItem(ref, index));
}

export default class WithDynamicListGesture extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		children: PropTypes.func.isRequired,
		goToPreviousPage: PropTypes.func.isRequired,
		goToNextPage: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	onKeyDown(event, options) {
		switch (event.keyCode) {
			case keycode.codes.up:
				event.preventDefault();
				event.stopPropagation();
				focusOnPreviousItem(this.ref, options, this.props.goToPreviousPage);
				break;
			case keycode.codes.down:
				event.preventDefault();
				event.stopPropagation();
				focusOnNextItem(this.ref, options, this.props.goToNextPage);
				break;
			case keycode.codes['page up']:
				event.preventDefault();
				event.stopPropagation();
				focusOnNextPage(this.ref, options, this.props.goToPreviousPage);
				break;
			case keycode.codes['page down']:
				event.preventDefault();
				event.stopPropagation();
				focusOnPreviousPage(this.ref, options, this.props.goToNextPage);
				break;

			default:
				break;
		}
	}

	render() {
		return (
			<div
				ref={ref => {
					this.ref = ref;
				}}
				className={this.props.className}
			>
				{this.props.children(this.onKeyDown)}
			</div>
		);
	}
}

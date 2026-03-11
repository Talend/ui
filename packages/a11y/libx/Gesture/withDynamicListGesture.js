import { jsx } from 'react/jsx-runtime';
import { Component, createRef } from 'react';
import { focusOn } from './focus';
function getAllItems(ref) {
	return ref.querySelectorAll('li > button');
}
function focusOnListItem(ref, index) {
	const listItem = getAllItems(ref)[index];
	focusOn(listItem);
}
function focusOnPreviousItem(ref, { index, size }, goToPreviousPage) {
	const nextIndex = index - 1;
	if (nextIndex < 0 && size) {
		goToPreviousPage(() => {
			focusOnListItem(ref, size - 1);
		});
	}
	focusOnListItem(ref, nextIndex);
}
function focusOnNextItem(ref, { index, size }, goToNextPage) {
	const nextIndex = index + 1;
	if (size && nextIndex >= size) {
		goToNextPage(() => {
			focusOnListItem(ref, 0);
		});
	}
	focusOnListItem(ref, nextIndex);
}
function focusOnNextPage(ref, { index }, goToNextPage) {
	goToNextPage(() => focusOnListItem(ref, index));
}
function focusOnPreviousPage(ref, { index }, goToPreviousPage) {
	goToPreviousPage(() => focusOnListItem(ref, index));
}
class WithDynamicListGesture extends Component {
	constructor(props) {
		super(props);
		this.myRef = createRef();
		this.onKeyDown = this.onKeyDown.bind(this);
	}
	onKeyDown(event, options) {
		switch (event.key) {
			case 'Up':
			case 'ArrowUp':
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnPreviousItem(this.myRef.current, options, this.props.goToPreviousPage);
				}
				break;
			case 'Down':
			case 'ArrowDown':
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnNextItem(this.myRef.current, options, this.props.goToNextPage);
				}
				break;
			case 'PageUp':
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnNextPage(this.myRef.current, options, this.props.goToPreviousPage);
				}
				break;
			case 'PageDown':
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnPreviousPage(this.myRef.current, options, this.props.goToNextPage);
				}
				break;
			default:
				break;
		}
	}
	render() {
		return /* @__PURE__ */ jsx('div', {
			ref: this.myRef,
			className: this.props.className,
			children: this.props.children(this.onKeyDown),
		});
	}
}
export { WithDynamicListGesture };
//# sourceMappingURL=withDynamicListGesture.js.map

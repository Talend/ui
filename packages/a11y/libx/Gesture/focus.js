import { FIRST, LAST } from './constants';
function focusOn(element) {
	if (element) {
		element.focus();
	}
}
function getAllItems(calendarRef) {
	return calendarRef.querySelectorAll('td > button[data-value]');
}
function getDay(calendarRef, offset) {
	const allItems = getAllItems(calendarRef);
	const index = offset >= 0 ? offset : allItems.length + offset;
	return allItems[index];
}
function focusWithinCurrentCalendar(calendarRef, indexToFocus = 0) {
	const allItems = getAllItems(calendarRef);
	if (indexToFocus === FIRST || indexToFocus < 0) {
		focusOn(allItems[0]);
	} else if (indexToFocus === LAST || indexToFocus > allItems.length - 1) {
		focusOn(allItems[allItems.length - 1]);
	} else {
		focusOn(allItems[indexToFocus]);
	}
}
function focusOnDay(calendarRef, indexToFocus, props) {
	const allItems = getAllItems(calendarRef);
	if (indexToFocus < 0) {
		props.goToPreviousMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus));
		});
	} else if (indexToFocus > allItems.length - 1) {
		props.goToNextMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus - allItems.length));
		});
	} else {
		focusOn(allItems[indexToFocus]);
	}
}
function focusOnCalendar(containerRef) {
	let target = containerRef.querySelector('td[aria-current="date"] > button');
	if (!target) {
		target = containerRef.querySelector('td > button[disabled=false]');
	}
	if (!target) {
		target = containerRef.querySelector('td > button[data-value]');
	}
	if (target) {
		target.focus();
	}
}
export { focusOn, focusOnCalendar, focusOnDay, focusWithinCurrentCalendar };
//# sourceMappingURL=focus.js.map

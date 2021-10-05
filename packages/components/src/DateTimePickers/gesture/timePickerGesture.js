
/**
 * Focus management on time picker.
 * - try to focus on the selected item
 * - try to focus on the 1st item
 */
export default function focusOnTime(containerRef) {
	let target = containerRef.querySelector('button[aria-current="time"]');
	if (!target) {
		target = containerRef.querySelector('button[role="listitem"]');
	}
	target.focus();
}

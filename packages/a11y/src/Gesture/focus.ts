export interface WithFocus {
	focus: HTMLElement['focus'];
}

export function focusOn(element?: WithFocus | null) {
	if (element) {
		element.focus();
	}
}

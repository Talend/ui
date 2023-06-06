export type DisclosureState = {
	visible: boolean;
	animated: boolean | number;
	animating: boolean;
};

export type DisclosureAction = {
	show: () => void;
	/**
	 * Changes the `visible` state to `false`
	 */
	hide: () => void;
	/**
	 * Toggles the `visible` state
	 */
	toggle: () => void;
};

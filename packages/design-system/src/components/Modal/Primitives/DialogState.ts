export type DialogState = {
	visible: boolean;
};

export type DialogAction = {
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

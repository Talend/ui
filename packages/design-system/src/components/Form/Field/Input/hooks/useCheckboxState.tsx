import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import useReadOnly from './useReadOnly';

export type CheckboxState = {
	/**
	 * Stores the state of the checkbox.
	 * If checkboxes that share this state have defined a `value` prop, it's
	 * going to be an array.
	 */
	state: boolean | 'indeterminate' | Array<number | string>;
};

export type CheckboxActions = {
	/**
	 * Sets `state`.
	 */
	setState: Dispatch<SetStateAction<CheckboxState['state']>>;
};

export type CheckboxInitialState = Partial<Pick<CheckboxState, 'state'>>;

export type CheckboxStateReturn = CheckboxState & CheckboxActions;

type ChoiceState = CheckboxInitialState & {
	readOnly?: boolean;
};

export default function useCheckboxState({ readOnly, ...choiceState }: ChoiceState) {
	const [state, setState] = useState(choiceState.state);
	const checkboxState = {
		state,
		setState,
	};
	const readOnlyState = useReadOnly(choiceState.state);

	useEffect(() => {
		if (choiceState.state !== undefined) {
			setState(choiceState.state);
		}
	}, [setState, choiceState.state]);

	if (readOnly) {
		return { ...checkboxState, ...readOnlyState, setState: () => {} };
	}
	return checkboxState;
}

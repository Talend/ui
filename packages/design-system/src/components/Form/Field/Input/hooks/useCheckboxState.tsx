import React, { useEffect } from 'react';
import Reakit, { useCheckboxState as useReakitCheckboxState } from 'reakit';

import useReadOnly from './useReadOnly';

type InitialChoiceState = Reakit.CheckboxInitialState & {
	readOnly?: boolean;
};

export default function useCheckboxState({ readOnly, ...initialState }: InitialChoiceState) {
	const checkboxState = useReakitCheckboxState(initialState);
	const readOnlyState = useReadOnly(initialState.state);

	useEffect(() => {
		checkboxState.setState(initialState.state);
	}, [initialState.state]);

	if (readOnly) {
		return { ...checkboxState, ...readOnlyState, setState: () => {} };
	}
	return checkboxState;
}

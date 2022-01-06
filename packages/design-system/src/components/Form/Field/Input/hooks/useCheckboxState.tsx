import { useEffect } from 'react';
import Reakit, { useCheckboxState as useReakitCheckboxState } from 'reakit';

import useReadOnly from './useReadOnly';

type ChoiceState = Reakit.CheckboxInitialState & {
	readOnly?: boolean;
};

export default function useCheckboxState({ readOnly, ...choiceState }: ChoiceState) {
	const checkboxState = useReakitCheckboxState(choiceState);
	const readOnlyState = useReadOnly(choiceState.state);
	const { setState } = checkboxState;

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

import { KeyboardEvent, MouseEvent } from 'react';

type Checked = boolean | 'indeterminate' | Array<number | string>;

type ReadOnlyState = {
	'aria-checked'?: boolean | 'mixed';
	checked?: Checked;
	onClick?: (e: MouseEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export default function useReadOnly(checked?: Checked) {
	const readOnlyState: ReadOnlyState = {};
	readOnlyState.onClick = e => {
		e.preventDefault();
	};
	readOnlyState.onKeyDown = e => {
		if (['Space', ' ', 'Enter'].some(match => e.key === match)) {
			e.preventDefault();
		}
	};
	readOnlyState['aria-checked'] = checked === 'indeterminate' ? 'mixed' : !!checked;
	readOnlyState.checked = !!checked;
	return readOnlyState;
}

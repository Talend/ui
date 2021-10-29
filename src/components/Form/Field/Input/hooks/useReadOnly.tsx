type Checked = boolean | 'indeterminate' | Array<number | string>;

type ReadOnlyState = {
	'aria-checked'?: Checked;
	checked?: Checked;
	onClick?: (e: MouseEvent) => void;
	onKeyDown?: (e: KeyboardEvent) => void;
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
	readOnlyState['aria-checked'] = !!checked;
	readOnlyState.checked = !!checked;
	return readOnlyState;
}

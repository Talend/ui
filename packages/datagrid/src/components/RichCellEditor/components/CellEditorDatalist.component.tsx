import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

import { Datalist } from '@talend/react-components';

import { AgGridCellValue } from '../../../types';

import theme from './CellEditorDatalist.component.scss';

interface CellEditorDatalistPropTypes {
	eGridCell: HTMLDivElement;
	onFilter: (search: string) => Promise<AgGridCellValue[]>;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
	value: string;
}

function CellDatalist(props: CellEditorDatalistPropTypes) {
	const { value: initialValue, eGridCell, onFilter, onChange } = props;

	const [value, setValue] = useState(initialValue);
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([] as AgGridCellValue[]);

	const handleUserInput = (inputValue: string) => {
		setIsLoading(true);

		onFilter(inputValue)
			.then(setOptions)
			.finally(() => {
				setIsLoading(false);
			});
	};
	const debouncedHandleUserInput = useCallback(debounce(handleUserInput, 300), []);

	return (
		<div
			className={theme['cell-editor-datalist']}
			style={{ height: `${eGridCell.scrollHeight}px`, width: `${eGridCell.scrollWidth}px` }}
		>
			<Datalist
				// Using autoFocus because <Datalist /> does not forward ref, so no manual focus possible
				autoFocus // eslint-disable-line jsx-a11y/no-autofocus
				titleMap={options}
				isLoading={isLoading}
				onFocus={(event: React.ChangeEvent<HTMLInputElement>) => {
					event.preventDefault();
					handleUserInput(event.target?.value);
				}}
				onLiveChange={(event: React.ChangeEvent<HTMLInputElement>, changedValue: string) => {
					event.preventDefault();
					setValue(changedValue);
					debouncedHandleUserInput(changedValue);
				}}
				onChange={(event: React.ChangeEvent<HTMLInputElement>, state: { value: string }) => {
					event.preventDefault();
					setIsLoading(false);
					onChange(event, state.value);
				}}
				value={value}
			/>
		</div>
	);
}

export default CellDatalist;

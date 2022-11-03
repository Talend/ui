import React, { useEffect, useState } from 'react';
import { SkeletonParagraph } from '@talend/design-system';
import classNames from 'classnames';

import { AgGridCellValue } from '../../types';

import CellEditorDatalist from './components/CellEditorDatalist.component';
import CellEditorTextarea from './components/CellEditorTextarea.component';

import theme from './RichCellEditor.component.module.scss';

type CellValue = string;

interface RichCellEditorPropTypes {
	initialValue: CellValue;
	isLoading?: boolean;
	hasSuggestions?: boolean;
	eGridCell: HTMLDivElement;
	onChange: (value: CellValue) => void;
	onFilter?: (search: string) => Promise<AgGridCellValue[]>;
	onCancel: () => void;
}

function RichCellEditor(props: RichCellEditorPropTypes) {
	const { onChange, onFilter, onCancel, initialValue, hasSuggestions, isLoading, eGridCell } =
		props;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		eGridCell.classList.add(theme['rich-cell-editor-edited-ag-grid-cell']);
		return () => {
			eGridCell.classList.remove(theme['rich-cell-editor-edited-ag-grid-cell']);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleInputChange = (
		_: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		newValue: CellValue,
	) => {
		const hasChanged = newValue !== initialValue;
		setValue(newValue);

		if (hasSuggestions && !hasChanged) {
			onCancel();
		} else {
			onChange(newValue);
		}
	};

	return (
		<div
			className={classNames({
				[theme['rich-cell-editor--loading']]: isLoading,
				[theme['rich-cell-editor--datalist']]: !!hasSuggestions,
			})}
		>
			{isLoading ? (
				<div
					className={theme['rich-cell-editor__skeleton']}
					style={{
						height: `${eGridCell.scrollHeight}px`,
						width: `${eGridCell.scrollWidth}px`,
					}}
				>
					<SkeletonParagraph size="M" />
				</div>
			) : hasSuggestions && onFilter ? (
				<CellEditorDatalist
					eGridCell={eGridCell}
					onFilter={onFilter}
					onChange={handleInputChange}
					value={value}
				/>
			) : (
				<CellEditorTextarea eGridCell={eGridCell} onChange={handleInputChange} value={value} />
			)}
		</div>
	);
}

export default RichCellEditor;

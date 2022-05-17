import React, { useState } from 'react';
import { SkeletonParagraph } from '@talend/design-system';
import classNames from 'classnames';

import { AgGridCellValue } from '../../types';

import CellEditorDatalist from './components/CellEditorDatalist.component';
import CellEditorTextarea from './components/CellEditorTextarea.component';

import theme from './RichCellEditor.scss';

type CellValue = string;

interface RichCellEditorPropTypes {
	initialValue: CellValue;
	isLoading?: boolean;
	hasSuggestions?: boolean;
	onChange: (value: CellValue) => void;
	onFilter?: (search: string) => Promise<AgGridCellValue[]>;
	onCancel: () => void;
}

function RichCellEditor(props: RichCellEditorPropTypes) {
	const { onChange, onFilter, onCancel, initialValue, hasSuggestions, isLoading } = props;
	const [value, setValue] = useState(initialValue);

	const handleInputChange = (
		_: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		newValue: CellValue,
	): void => {
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
				<div className={theme['rich-cell-editor__skeleton']}>
					<SkeletonParagraph size="M" />
				</div>
			) : hasSuggestions && onFilter ? (
				<CellEditorDatalist onFilter={onFilter} onChange={handleInputChange} value={value} />
			) : (
				<CellEditorTextarea onChange={handleInputChange} value={value} />
			)}
		</div>
	);
}

export default RichCellEditor;

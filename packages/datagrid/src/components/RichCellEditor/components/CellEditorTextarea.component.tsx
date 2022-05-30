import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import theme from './CellEditorTextarea.component.scss';

interface CellEditorTextareaPropTypes {
	eGridCell: HTMLDivElement;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
	value: string;
}

function CellEditorTextarea({ eGridCell, value, onChange }: CellEditorTextareaPropTypes) {
	const ref = useRef<HTMLTextAreaElement>(null);
	const [rows, setRows] = useState(1);
	const [styles, setStyles] = useState({
		minHeight: `${eGridCell.scrollHeight}px`,
		minWidth: `${eGridCell.scrollWidth}px`,
		height: `${eGridCell.scrollHeight}px`,
		width: `${eGridCell.scrollWidth}px`,
	});

	const resizeTextarea = () => {
		if (ref.current) {
			const lineHeight = parseInt(
				window.getComputedStyle(ref.current).getPropertyValue('line-height'),
				10,
			);

			const { scrollHeight } = ref.current;
			setRows(scrollHeight / lineHeight);
			setStyles({ ...styles, height: `${scrollHeight}px` });
		}
	};

	useEffect(() => {
		ref.current?.focus();
		resizeTextarea();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<textarea
			className={classNames(theme['cell-editor-textarea'], 'form-control')}
			style={styles}
			rows={rows}
			value={value}
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
				resizeTextarea();
				onChange(event, event.target?.value);
			}}
			ref={ref}
		/>
	);
}

export default CellEditorTextarea;

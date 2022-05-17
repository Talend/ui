import React, { useEffect, useRef, useState } from 'react';

const defaultStyle = {
	minHeight: '3.6rem',
	maxHeight: '10rem',
};

interface CellEditorTextareaPropTypes {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
}

function CellEditorTextarea({ value, onChange }: CellEditorTextareaPropTypes) {
	const ref = useRef<HTMLTextAreaElement>(null);
	const [rows, setRows] = useState(1);
	const [height, setHeight] = useState('');

	const resizeTextarea = () => {
		if (ref.current) {
			const lineHeight = parseInt(
				window.getComputedStyle(ref.current).getPropertyValue('line-height'),
				10,
			);

			const { scrollHeight } = ref.current;
			setRows(scrollHeight / lineHeight);
			setHeight(`${scrollHeight}px`);
		}
	};

	useEffect(() => {
		ref.current?.focus();
		resizeTextarea();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<textarea
			className="form-control"
			style={{ ...defaultStyle, height }}
			rows={rows}
			value={value}
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
				resizeTextarea(); // @todo Should be in sync with new value
				onChange(event, event.target?.value);
			}}
			ref={ref}
		/>
	);
}

export default CellEditorTextarea;

import { Fragment, useState, useRef, useEffect, CSSProperties } from 'react';

const EXTRA_SPACE = 5;

const inputTextSizerStyle: CSSProperties = {
	padding: '0 1rem',
	fontSize: '1.4rem',
	visibility: 'hidden',
	position: 'absolute',
};

type InputSizerProps = {
	placeholder?: string;
	inputText?: string;
	children: (width: number) => React.ReactNode;
	minWidth: number;
};

function InputSizer({ placeholder, inputText, children, minWidth }: InputSizerProps) {
	const [width, setWidth] = useState(0);
	const sizerRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		setWidth(minWidth || (sizerRef.current && sizerRef.current.getBoundingClientRect().width) || 0);
	});

	const text = inputText || placeholder;
	return (
		<Fragment>
			{children(width + EXTRA_SPACE)}
			<span style={inputTextSizerStyle} ref={sizerRef} data-testid="InputSizer">
				{text}
			</span>
		</Fragment>
	);
}

export default InputSizer;

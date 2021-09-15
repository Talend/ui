import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const EXTRA_SPACE = 5;

const inputTextSizerStyle = {
	padding: '0 1rem',
	fontSize: '1.4rem',
	visibility: 'hidden',
	position: 'absolute',
};

function InputSizer({ placeholder, inputText, children, minWidth }) {
	const [width, setWidth] = useState(0);
	const sizerRef = useRef(null);

	useEffect(() => {
		setWidth(minWidth || sizerRef.current.getBoundingClientRect().width);
	});

	const text = inputText || placeholder;
	return (
		<React.Fragment>
			{children(width + EXTRA_SPACE)}
			<span style={inputTextSizerStyle} ref={sizerRef}>
				{text}
			</span>
		</React.Fragment>
	);
}

InputSizer.propTypes = {
	placeholder: PropTypes.string,
	inputText: PropTypes.string,
	children: PropTypes.func.isRequired,
	minWidth: PropTypes.number,
};

export default InputSizer;

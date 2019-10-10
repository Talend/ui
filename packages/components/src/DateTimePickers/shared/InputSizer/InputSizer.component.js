import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

const EXTRA_SPACE = 5;

const inputTextSizerStyle = {
	fontWeight: 400,
	fontSize: '1.6rem',
	visibility: 'hidden',
	position: 'absolute',
};

const placeholderSizerStyle = {
	...inputTextSizerStyle,
	fontStyle: 'oblique',
};

function InputSizer({ placeholder, inputText, children }) {
	const [width, setWidth] = useState(0);
	const sizerRef = useRef(null);

	useEffect(() => {
		setWidth(sizerRef.current.getBoundingClientRect().width);
	}, [inputText, placeholder]);

	const style = inputText ? inputTextSizerStyle : placeholderSizerStyle;
	const text = inputText ? format(new Date(0), placeholder) : placeholder;
	return (
		<React.Fragment>
			{children(width + EXTRA_SPACE)}
			<span style={style} ref={sizerRef}>
				{text}
			</span>
		</React.Fragment>
	);
}

InputSizer.propTypes = {
	placeholder: PropTypes.string.isRequired,
	inputText: PropTypes.string,
	children: PropTypes.func.isRequired,
};

export default InputSizer;

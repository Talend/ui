import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const inputTextSizerStyle = {
	fontWeight: 400,
	fontSize: '16px',
	visibility: 'hidden',
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

	return (
		<React.Fragment>
			{children(width)}
			<span style={inputText ? inputTextSizerStyle : placeholderSizerStyle} ref={sizerRef}>
				{placeholder}
			</span>
		</React.Fragment>
	);
}

InputSizer.propTypes = {
	placeholder: PropTypes.string.isRequired,
	inputText: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired,
};

export default InputSizer;

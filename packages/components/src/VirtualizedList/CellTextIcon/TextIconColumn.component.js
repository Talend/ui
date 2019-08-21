import React from 'react';
import Content from '../Content.component';
import TextIconConfiguration from './TextIconColumn.configuration';

function TextIconColumn(props) {
	return <Content {...props} />;
}

TextIconColumn.defaultProps = {
	...Content.defaultProps,
	...TextIconConfiguration,
};

export default TextIconColumn;

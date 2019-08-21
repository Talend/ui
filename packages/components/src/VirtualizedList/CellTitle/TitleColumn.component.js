import React from 'react';
import Content from '../Content.component';
import TitleConfiguration from './TitleColumn.configuration';

function TitleColumn(props) {
	return <Content {...props} />;
}

TitleColumn.defaultProps = {
	...Content.defaultProps,
	...TitleConfiguration,
};

export default TitleColumn;

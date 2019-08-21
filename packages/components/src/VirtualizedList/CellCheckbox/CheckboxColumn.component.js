import React from 'react';
import Content from '../Content.component';
import CheckboxConfiguration from './CheckboxColumn.configuration';

function CheckboxColumn(props) {
	return <Content {...props} />;
}

CheckboxColumn.defaultProps = {
	...Content.defaultProps,
	...CheckboxConfiguration,
};

export default CheckboxColumn;

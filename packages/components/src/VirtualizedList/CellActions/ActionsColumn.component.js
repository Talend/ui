import React from 'react';
import Content from '../Content.component';
import ActionsConfiguration from './ActionsColumn.configuration';

function ActionsColumn(props) {
	return <Content {...props} />;
}

ActionsColumn.defaultProps = {
	...Content.defaultProps,
	...ActionsConfiguration,
};

export default ActionsColumn;

import React from 'react';
import Content from '../Content.component';
import BadgeConfiguration from './BadgeColumn.configuration';

function BadgeColumn(props) {
	return <Content {...props} />;
}

BadgeColumn.defaultProps = {
	...Content.defaultProps,
	...BadgeConfiguration,
};

export default BadgeColumn;

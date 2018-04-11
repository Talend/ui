import React from 'react';
import PropTypes from 'prop-types';
import genericViewerConfiguration from './genericViewer.configuration';
import GenericViewer from '../Generic';

import theme from './RecordViewer.scss';

export default function Record(props) {
	const data = { schema: props.schema, data: props.data };
	return (
		<GenericViewer
			{...props}
			{...genericViewerConfiguration}
			className={theme.record}
			data={data}
			isRoot
		/>
	);
}
Record.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

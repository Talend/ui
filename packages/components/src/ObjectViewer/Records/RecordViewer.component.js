import React from 'react';
import genericViewerConfiguration from './genericViewer.configuration';
import GenericViewer from '../Generic';

export default function Record(props) {
	return (
		<GenericViewer
			{...props}
			{...genericViewerConfiguration}
		/>
	);
}

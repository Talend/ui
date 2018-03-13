import React from 'react';
import GenericViewer from './GenericViewer.component';

import theme from './RecordViewer.scss';

function getFields({ value }, type) {
	if (type === 'object') {
		return Object.keys(value).map(dataKey => ({ dataKey, value: value[dataKey] }));
	}
	return value;
}

function getDataType({ value }) {
	return Array.isArray(value) ? 'array' : typeof value;
}

function getQuality({ value }) {
	switch (value.quality) {
		case -1:
			return 'invalid';
		case 0:
			return 'empty';
		default:
			return 'valid';
	}
}

function getValue({ value }) {
	return value;
}

function getIcon({ isOpened, type }) {
	let name;
	let transform;
	let className;
	if (type === 'object') {
		name = 'talend-plus-circle';
		className = theme.icon;
	} else {
		name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
		transform = isOpened ? null : 'rotate-180';
	}

	return { className, name, transform };
}

export default function Record(props) {
	return (
		<GenericViewer
			{...props}
			getFields={getFields}
			getDataType={getDataType}
			getIcon={getIcon}
			getQuality={getQuality}
			getValue={getValue}
		/>
	);
}
Record.defaultProps = {

};
Record.propTypes = {

};

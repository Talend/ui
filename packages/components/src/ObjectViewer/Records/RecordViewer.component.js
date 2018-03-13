import React from 'react';
import GenericViewer from './GenericViewer.component';
import Icon from '../../Icon';

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

function getValue({ value }) {
	return value;
}

function getIcon(type, isOpened, onClick) {
	let name;
	let transform;
	if (type === 'object') {
		name = 'talend-plus-circle';
	} else {
		name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
		transform = isOpened ? null : 'rotate-180';
	}

	return (
		<Icon
			name={name}
			className={theme.icon}
			transform={transform}
			onClick={onClick}
		/>
	);
}

export default function Record(props) {
	return (
		<GenericViewer
			{...props}
			getFields={getFields}
			getDataType={getDataType}
			getIcon={getIcon}
			getValue={getValue}
		/>
	);
}
Record.defaultProps = {

};
Record.propTypes = {

};

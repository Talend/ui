import theme from './RecordViewer.scss';

/**
 * Value is either
 * - an array of avro entry: 	It is supported as the dataKey is the index,
 *								and each element will be displayed as new nodes.
 * - an object where each property is an avro entry:	We adapt them to have an array of
 * 														{ dataKey: propertyName, value: avro entry }
 */
function getFields({ value }, type) {
	if (type === 'object') {
		return Object.keys(value).map(dataKey => ({ dataKey, value: value[dataKey] }));
	}
	return value;
}

/**
 * The value is the data, we return its type.
 */
function getDataType({ value }) {
	return Array.isArray(value) ? 'array' : typeof value;
}

/**
 * The value is an avro entry that contains a quality indicator.
 * We adapt this indicator to a quality constant.
 */
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

/**
 * Value is an avro entry { value: the real value, quality: quality indicator }
 */
function getValue({ value }) {
	return value.value;
}

/**
 * For objects (technical type provided, the corresponding avro type is records),
 * we display a "plus" icon.
 * For arrays, we stick to the caret.
 */
function getIcon({ isOpened, type }) {
	let name;
	let transform;
	let className;
	if (type === 'object') {
		name = 'talend-plus-circle'; // TODO we don't have a talend-minus-circle
		className = theme.icon;
	} else {
		name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
		transform = isOpened ? null : 'rotate-180';
	}

	return { className, name, transform };
}

export default {
	getDataType,
	getFields,
	getIcon,
	getQuality,
	getValue,
};

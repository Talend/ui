import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import get from 'lodash/get';
import DefaultValueRenderer from './DefaultValueRenderer.component';
import theme from './SimpleTextKeyValue.scss';

const DATE_TYPE_FORMATER = 'date';
const LONG_TYPE = 'long';
const AVRO_TYPES = [
	'boolean',
	'int',
	LONG_TYPE,
	'float',
	'double',
	'bytes',
	'string',
	'unknown',
	'date',
];
const TIMESTAMP_MILLIS_LOGICAL_TYPES = 'timestamp-millis';
const LOGICAL_TYPES = [TIMESTAMP_MILLIS_LOGICAL_TYPES];
const PRIMITIVES_MAPPING = {
	double: 'int',
	float: 'int',
	int: 'int',
	long: 'int',
};

function getTypeRenderer(schemaType) {
	if (schemaType.type === LONG_TYPE && schemaType.logicalType === TIMESTAMP_MILLIS_LOGICAL_TYPES) {
		return DATE_TYPE_FORMATER;
	}

	if (PRIMITIVES_MAPPING[schemaType.type]) {
		return PRIMITIVES_MAPPING[schemaType.type];
	}

	return schemaType.type;
}

export function AvroRenderer({ colDef, data, isValueOverflown, isLongValueToggled }) {
	const typeRenderer = getTypeRenderer(colDef.avro.type);

	const dateToString = value => {
		if (value === null) {
			return value;
		}

		try {
			return new Date(value).toISOString();
		} catch (e) {
			return value;
		}
	};

	switch (typeRenderer) {
		case 'DefaultInt':
		case 'number':
			return (
				<DefaultValueRenderer
					value={data.value}
					isValueOverflown={isValueOverflown}
					isLongValueToggled={isLongValueToggled}
					className={classNames(theme['td-cell-int'], 'td-cell-int')}
				/>
			);

		case 'DefaultDate':
		case 'date':
		case 'datetime':
			return (
				<DefaultValueRenderer
					value={dateToString(data.value)}
					isValueOverflown={isValueOverflown}
					isLongValueToggled={isLongValueToggled}
					className={classNames('td-cell-date')}
				/>
			);

		default:
			return (
				<DefaultValueRenderer
					value={data.value}
					isValueOverflown={isValueOverflown}
					isLongValueToggled={isLongValueToggled}
				/>
			);
	}
}

AvroRenderer.propTypes = {
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(AVRO_TYPES),
				logicalType: PropTypes.oneOf(LOGICAL_TYPES),
			}),
		}),
	}),
	data: PropTypes.object,
	isValueOverflown: PropTypes.bool,
	isLongValueToggled: PropTypes.bool,
};

// eslint-disable-next-line prefer-arrow-callback
const SimpleTextKeyValue = React.forwardRef(function SimpleTextKeyValue(
	{
		formattedKey,
		className,
		schema,
		separator,
		style,
		value,
		displayTypes,
		isValueOverflown,
		isLongValueToggled,
	},
	ref,
) {
	return (
		<span
			ref={ref}
			className={classNames(theme['tc-simple-text'], 'tc-simple-text', className)}
			style={style}
		>
			{!isNull(formattedKey) && (
				<span className={classNames(theme['tc-simple-text-key'], 'tc-simple-text-key')}>
					{get(schema, 'talend.component.label', formattedKey)}
					{separator}
					{displayTypes && schema && value && (
						<span className={classNames(theme['tc-simple-text-type'], 'tc-simple-text-type')}>
							- {schema.type.type || value.unionKey}
						</span>
					)}
				</span>
			)}
			{!schema && value && (
				<span
					className={classNames(theme['tc-simple-text-value'], 'tc-simple-text-value', {
						[theme['shrink-value']]: isValueOverflown,
						[theme['wrap-value']]: isLongValueToggled,
					})}
				>
					{value}
				</span>
			)}
			{schema && value && (
				<AvroRenderer
					colDef={{ avro: schema }}
					data={value}
					isValueOverflown={isValueOverflown}
					isLongValueToggled={isLongValueToggled}
				/>
			)}
		</span>
	);
});

SimpleTextKeyValue.displayName = 'SimpleTextKeyValue';

SimpleTextKeyValue.propTypes = {
	className: PropTypes.string,
	formattedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	schema: PropTypes.object,
	value: PropTypes.any,
	separator: PropTypes.string,
	style: PropTypes.object,
	displayTypes: PropTypes.bool,
	isValueOverflown: PropTypes.bool,
	isLongValueToggled: PropTypes.bool,
};

SimpleTextKeyValue.defaultProps = {
	displayTypes: false,
};

export default SimpleTextKeyValue;

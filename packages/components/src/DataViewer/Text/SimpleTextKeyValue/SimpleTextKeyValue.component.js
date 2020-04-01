import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './SimpleTextKeyValue.scss';

const AvroRenderer = ({ data }) => <div>{data.value}</div>;
AvroRenderer.propTypes = {
	data: PropTypes.any,
};

export default function SimpleTextKeyValue({
	formattedKey,
	className,
	schema,
	separator,
	style,
	value,
}) {
	return (
		<span
			className={classNames(theme['tc-simple-text'], 'tc-simple-text', className)}
			style={style}
		>
			{formattedKey && (
				<span className={classNames(theme['tc-simple-text-key'], 'tc-simple-text-key')}>
					{formattedKey}
					{separator}
				</span>
			)}
			{!schema && value && (
				<span className={classNames(theme['tc-simple-text-value'], 'tc-simple-text-value')}>
					{value}
				</span>
			)}
			{schema && value && <AvroRenderer colDef={{ avro: schema }} data={value} />}
		</span>
	);
}

SimpleTextKeyValue.propTypes = {
	className: PropTypes.string,
	formattedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	schema: PropTypes.object,
	value: PropTypes.object,
	separator: PropTypes.string,
	style: PropTypes.object,
};

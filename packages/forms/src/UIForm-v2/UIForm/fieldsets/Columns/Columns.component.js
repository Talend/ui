import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Widget from '../../Widget';
import theme from './Columns.scss';

export default function Columns(props) {
	const { schema, ...restProps } = props;

	return (
		<div className={classNames('tf-columns', theme['tf-columns'])}>
			{schema.title && <legend>{schema.title}</legend>}
			<div className={classNames('tf-columns-items', theme.items)}>
				{schema.items.map((colSchema, index) => (
					<Widget {...restProps} key={index} schema={colSchema} />
				))}
			</div>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Columns.propTypes = {
		schema: PropTypes.shape({
			items: PropTypes.array.isRequired,
		}).isRequired,
	};
}

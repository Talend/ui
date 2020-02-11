import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ArrayContext from './context';

import theme from './Array.scss';

export default function Items({ children, ...rest }) {
	const { nbItems } = useContext(ArrayContext);

	return (
		<ol className={theme.list} {...rest}>
			{Array.from({ length: nbItems }).map((_, index) => (
				<li key={index} className={theme.item}>
					{children(index)}
				</li>
			))}
		</ol>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Items.propTypes = {
		children: PropTypes.func.isRequired,
	};
}

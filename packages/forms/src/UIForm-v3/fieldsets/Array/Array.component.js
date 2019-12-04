import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Fieldset from '../Fieldset';
import theme from './Array.scss';

export default function ArrayFieldset(props) {
	const { children, defaultNbItems = 0, name, rhf, ...restProps } = props;
	const value = rhf.watch(name);

	const [nbItems, setNbItems] = useState(() => {
		if (value) {
			return value.length;
		}
		return defaultNbItems;
	});

	return (
		<Fieldset {...restProps}>
			<ol>
				{Array.from({ length: nbItems }).map((_, index) => (
					<li key={index} className={theme.item}>
						{children(index)}
					</li>
				))}
			</ol>
		</Fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayFieldset.propTypes = {
		children: PropTypes.func.isRequired,
		defaultNbItems: PropTypes.number,
		name: PropTypes.string.isRequired,
		rhf: PropTypes.object.isRequired,
	};
}

import PropTypes from 'prop-types';
import React from 'react';

import JSONLike from '../JSONLike';
import theme from './List.scss';

function List({ data, ...props }) {
	if (!Array.isArray(data)) {
		return null;
	}
	return (
		<ul className={`${theme.container} tc-object-viewer list-unstyled`}>
			{data.map((obj, index) => (
				<li key={index}>
					<JSONLike
						data={obj}
						{...props}
						jsonpath={`$[${index}]`}
					/>
				</li>
			))}
		</ul>
	);
}

List.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.object,
	),
};

export default List;

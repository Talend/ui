import PropTypes from 'prop-types';
import React from 'react';

import JSONLike from '../JSONLike';
import theme from './List.scss';

function List({ data, ...props }) {
	if (!data || (!Array.isArray(data) && !Array.isArray(data.datas))) {
		return null;
	}
	// The datas can be an array or an array in an object. We assign the value correctly here.
	const datas = Array.isArray(data) ? data : data.datas;
	return (
		<ul className={`${theme.container} tc-object-viewer list-unstyled`}>
			{datas.map((obj, index) => (
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

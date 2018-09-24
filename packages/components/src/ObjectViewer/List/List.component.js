import PropTypes from 'prop-types';
import React from 'react';

import JSONLike from '../JSONLike';
import theme from './List.scss';

function List({ data, ...props }) {
	if (!Array.isArray(data) && !Array.isArray(data.dataset)) {
		return null;
	}
	// The datas can be an array or an array in an object. We assign the value correctly here.
	const dataset = Array.isArray(data) ? data : data.dataset;
	return (
		<ul className={`${theme.container} tc-object-viewer list-unstyled`}>
			{dataset.map((obj, index) => (
				<li key={index}>
					<JSONLike data={obj} {...props} jsonpath={`$[${index}]`} />
				</li>
			))}
		</ul>
	);
}

List.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;

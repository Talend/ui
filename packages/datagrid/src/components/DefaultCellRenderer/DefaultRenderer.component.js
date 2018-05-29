import React from 'react';
import PropTypes from 'prop-types';

import DefaultValueRenderer from './DefaultValueRenderer';

export default function DefaultRenderer({ data }) {
	// todo show label is data.value is empty
	return (
		<DefaultValueRenderer
			renderValue={() => [
				<span
					style={{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						backgroundColor: 'gray',
						border: '1px dotted black',
					}}
				/>,
				<span style={{ verticalAlign: 'super' }}>{data.value}</span>,
				<span
					style={{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						backgroundColor: 'gray',
						border: '1px dotted black',
					}}
				/>,
			]}
		/>
	);
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};

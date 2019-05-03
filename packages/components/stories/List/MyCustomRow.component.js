import React from 'react';
import PropTypes from 'prop-types';

export default function MyCustomRow(props) {
	return (
		<div style={props.style}>
			<h1 style={{ fontSize: 16 }}>{props.parent.props.collection[props.index].name}</h1>
			<ul>
				<li>style: {JSON.stringify(props.style)}</li>
				<li>index: {props.index}</li>
				<li>isScrolling: {props.isScrolling.toString()}</li>
			</ul>
		</div>
	);
}
MyCustomRow.propTypes = {
	index: PropTypes.number,
	isScrolling: PropTypes.bool,
	style: PropTypes.object,
	parent: PropTypes.shape({
		props: PropTypes.shape({ collection: PropTypes.array }),
	}),
};

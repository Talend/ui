import React from 'react';

/**
 * @param {object} props react props
 * @example
<DisplayTile name="Hello world"></DisplayTile>
 */
function DisplayTile(props) {
	return (
		<div className="panel panel-default">
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</div>
	);
}

DisplayTile.propTypes = {
	items: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
	columns: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
};

export default DisplayTile;

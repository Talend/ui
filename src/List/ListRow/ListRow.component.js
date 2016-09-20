import React from 'react';

/**
 * @param {object} props react props
 * @example
ListRow name="Hello world"></%= props.name >
 */
function ListRow(props) {
	return (<div>{props.name}</div>);
}

ListRow.propTypes = {
	name: React.PropTypes.string,
};

export default ListRow;

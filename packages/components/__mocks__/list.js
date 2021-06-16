/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
	render() {
		const { index, onKeyDown, ...props } = this.props;
		return (
			<div
				{...props}
				id={`item-${index}`}
				ref={ref => {
					this.ref = ref;
				}}
				role="listitem"
				tabIndex="0"
				onKeyDown={e => onKeyDown(e, this.ref)}
			>
				Item {index}
			</div>
		);
	}
}
ListItem.propTypes = {
	index: PropTypes.number,
	onKeyDown: PropTypes.func.isRequired,
};

function List(props) {
	return (
		<div role="list">
			<ListItem index={0} {...props} />
			<div role="group">
				<ListItem index={1} {...props} />
			</div>
			<ListItem index={2} {...props} />
			<ListItem index={3} {...props} />
		</div>
	);
}

List.displayName = 'List';

export default List;

import PropTypes from 'prop-types';
import React from 'react';

class TreeItem extends React.Component {
	render() {
		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<li
				id={this.props.item.id}
				role="treeitem"
				tabIndex="-1"
				onKeyDown={e => this.props.onKeyDown(e, this.ref, this.props.item)}
				ref={ref => {
					this.ref = ref;
				}}
				aria-level={this.props.level}
				aria-posinset={this.props.posinset}
			>
				{name}
				{this.props.item.isOpened ? this.props.children : null}
			</li>
		);
	}
}
TreeItem.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string,
	isOpened: PropTypes.bool,
	item: PropTypes.object,
	level: PropTypes.number,
	onKeyDown: PropTypes.func.isRequired,
	posinset: PropTypes.number,
};

function Tree(props) {
	return (
		<ul role={props.level === 0 ? 'tree' : undefined}>
			{props.items.map((item, index) => (
				<TreeItem
					key={`item-${props.level}-${index}`}
					onKeyDown={props.onKeyDown}
					item={item}
					name={`Item ${props.level} ${index}`}
					level={props.level}
					posinset={index}
				>
					{item.children && (
						<Tree key="children" {...props} items={item.children} level={props.level + 1} />
					)}
				</TreeItem>
			))}
		</ul>
	);
}
Tree.displayName = 'Tree';
Tree.defaultProps = {
	items: [],
	level: 0,
};
Tree.propTypes = {
	items: PropTypes.array,
	level: PropTypes.number,
};

export default Tree;

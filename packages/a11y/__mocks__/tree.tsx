import React from 'react';
import { CalendarGestureProps } from '../src/Gesture/propTypes';
type TreeItemProps = {
	children: any;
	id: string;
	isOpened: boolean;
	item: any;
	level: number;
	onKeyDown: (event: React.KeyboardEvent, ref: HTMLElement, item: any) => void;
	posinset: number;
};
class TreeItem extends React.Component<TreeItemProps> {
	ref = React.createRef<HTMLLIElement>();

	render() {
		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<li
				id={this.props.item.id}
				role="treeitem"
				tabIndex={-1}
				onKeyDown={e => this.props.onKeyDown(e, this.ref, this.props.item)}
				ref={this.ref}
				aria-level={this.props.level}
				aria-posinset={this.props.posinset}
			>
				{this.props.item.name}
				{this.props.item.isOpened ? this.props.children : null}
			</li>
		);
	}
}

type TreeProps = CalendarGestureProps & {
	items: any[];
	level: number;
	onKeyDown: (event: React.KeyboardEvent, ref: HTMLElement, item: any) => void;
};

function Tree(props: TreeProps) {
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

export default Tree;

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
type ListItemProps = {
	index: number;
	onKeyDown: (event: React.KeyboardEvent, ref: HTMLElement) => void;
};
class ListItem extends React.Component<ListItemProps> {
	ref = React.createRef<HTMLDivElement>();

	render() {
		const { index, onKeyDown, ...props } = this.props;
		return (
			<div
				{...props}
				data-test={`item-${index}`}
				id={`item-${index}`}
				ref={this.ref}
				role="listitem"
				tabIndex={0}
				onKeyDown={e => onKeyDown(e, this.ref.current)}
			>
				Item {index}
			</div>
		);
	}
}

function List(props: ListItemProps) {
	return (
		<div role="list">
			<ListItem {...props} index={0} />
			<div role="group">
				<ListItem {...props} index={1} />
			</div>
			<ListItem {...props} index={2} />
			<ListItem {...props} index={3} />
		</div>
	);
}

List.displayName = 'List';

export default List;

import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';
import { getNodeRenderOptions, updateNode } from 'react-virtualized-tree/lib/selectors/nodes';
import { Renderer } from 'react-virtualized-tree/lib/shapes/rendererShapes';

import Action from '../../Actions/Action';
import css from './Foldable.scss';

const Foldable = ({
	onChange,
	node,
	children,
	index,
	iconsClassNameMap = {
		expanded: 'mi mi-keyboard-arrow-down',
		collapsed: 'mi mi-keyboard-arrow-right',
		lastChild: '',
	},
}) => {
	debugger;
	const { hasChildren, isExpanded } = getNodeRenderOptions(node);
	/*const className = classNames({
		[iconsClassNameMap.expanded]: hasChildren && isExpanded,
		[iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
		[iconsClassNameMap.lastChild]: !hasChildren,
	});
*/
	const handleChange = () => onChange({ ...updateNode(node, { expanded: !isExpanded }), index });

	return (
		<span onDoubleClick={handleChange}>
			{hasChildren && (
				<Action
					key="toggle"
					className={css['tc-treeview-toggle']}
					icon="talend-caret-down"
					iconTransform={isExpanded ? undefined : 'rotate-270'}
					id={index && `${index}-toggle`}
					onKeyDown={submitEvent(handleChange)}
					onClick={handleChange}
					label=""
					aria-hidden
					tabIndex="-1"
					link
				/>
			)}
			{children}
		</span>
	);
};

// <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />

Foldable.propTypes = {
	...Renderer,
	iconsClassNameMap: PropTypes.shape({
		expanded: PropTypes.string,
		collapsed: PropTypes.string,
		lastChild: PropTypes.string,
	}),
};

export default Foldable;

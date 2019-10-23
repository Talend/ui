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
}) => {
	const { hasChildren, isExpanded } = getNodeRenderOptions(node);
	const handleChange = () => {
		console.log("foldable handleChange");
		return onChange({ ...updateNode(node, { expanded: !isExpanded }), index });
	}

	return (
		<div>
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
			{!hasChildren && <div className={css['tc-fold-placeholder']} />}
			{children}
		</div>
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

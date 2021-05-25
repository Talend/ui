import React from 'react';
import PropTypes from 'prop-types';
import { importFromCDN } from '../importFromCDN';
import Skeleton from '../Skeleton';

function DefaultSkeleton() {
	return (
		<div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.button} />
		</div>
	);
}

/**
 * ImportLazy component replace the need for react lazy
 */
export function ImportLazy(props) {
	const [added, setAdded] = React.useState(false);
	const [loaded, setLoaded] = React.useState(false);
	if (!added) {
		importFromCDN(props).then(mod => {
			setLoaded(mod || true);
		});
		setAdded(true);
	}
	if (added && loaded) {
		console.log(props.children);
		if (typeof props.children[0] === 'function') {
			return props.children[0](loaded);
		}
		return props.children;
	}
	if (props.skeleton) {
		return props.skeleton;
	}
	return <DefaultSkeleton />;
}

ImportLazy.propTypes = {
	children: PropTypes.node,
	skeleton: PropTypes.node,
};

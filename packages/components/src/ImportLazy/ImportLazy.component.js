import React from 'react';
import PropTypes from 'prop-types';
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
export function ImportLazy({skeleton, name, version, path, varName, children}) {
	const [added, setAdded] = React.useState(false);
	const [loaded, setLoaded] = React.useState(false);
	React.useEffect(() => {
		const src = window.Talend.getAssetUrl({name, version, path});
		const onload = () => {
			if (!varName) {
				setLoaded(true);
			}
		};
		window.Talend.addScript({src, onload});
		if (varName) {
			const intervalId = setInterval(() => {
				if (window[varName]) {
					clearInterval(intervalId);
					setLoaded(true);
				}
			}, 200);
		}
	}, []);
	if (added && loaded) {
		if (typeof children[0] === 'function') {
			return children[0](loaded);
		}
		return children;
	}
	if (skeleton) {
		return skeleton;
	}
	return <DefaultSkeleton />;
}

ImportLazy.propTypes = {
	children: PropTypes.node,
	skeleton: PropTypes.node,
};

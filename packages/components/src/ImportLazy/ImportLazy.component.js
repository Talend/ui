import React from 'react';
import PropTypes from 'prop-types';
import assetsApi from '@talend/assets-api';

import Skeleton from '../Skeleton';

function DefaultSkeleton() {
	return (
		<div>
			<div>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
			</div>
			<div>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			</div>
			<div>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			</div>
			<div>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			</div>
			<div>
				<Skeleton type={Skeleton.TYPES.button} />
			</div>
		</div>
	);
}

/**
 * ImportLazy component replace the need for react lazy
 */
export function ImportLazy({ skeleton, name, version, path, varName, children }) {
	const [loaded, setLoaded] = React.useState(false);
	React.useEffect(() => {
		const src = assetsApi.getUrl({ name, version, path });
		const onload = () => {
			if (!varName) {
				setLoaded(true);
			}
		};
		assetsApi.addScript({ src, onload });
		if (varName) {
			const intervalId = setInterval(() => {
				if (window[varName]) {
					clearInterval(intervalId);
					setLoaded(true);
				}
			}, 200);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loaded) {
		if (typeof children === 'function') {
			return children(window[varName]);
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

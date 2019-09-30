import React from 'react';
import CircularProgress from '@talend/react-components/lib/CircularProgress';

const BaseCode = React.lazy(() => import(/* webpackChunkName: "react-ace" */ './Code.component'));

export default function CodeLazy(props) {
	return (
		<React.Suspense
			fallback={
				<div aria-busy>
					<CircularProgress />
				</div>
			}
		>
			<BaseCode {...props} />
		</React.Suspense>
	);
}

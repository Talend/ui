import React from 'react';

import Button from '.';
import Tooltip from '../Tooltip';

export default {
	component: Button,
};

export const Loading = {
	render: props => {
		const [loading, isLoading] = React.useState(false);
		return (
			<Tooltip title="Relevant description of the basic button">
				<Button.Primary
					icon="talend-check"
					loading={loading}
					onClick={() => {
						isLoading(true);
						setTimeout(() => isLoading(false), 3000);
					}}
					{...props}
				>
					Async call to action
				</Button.Primary>
			</Tooltip>
		);
	},
};

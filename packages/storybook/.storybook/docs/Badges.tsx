import React, { ReactElement } from 'react';

import Badge from './Badge';

import theme from './Badges.scss';

const StatusList = ({ children }: React.PropsWithChildren<any>) => {
	return (
		<ul className={theme.badges} role="list">
			{children.map((child: ReactElement<typeof Badge>, key: number) => (
				<li key={key}>{child}</li>
			))}
		</ul>
	);
};

export default StatusList;

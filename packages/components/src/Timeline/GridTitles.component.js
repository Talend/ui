import React from 'react';
import { useTimelineContext } from './context';

import theme from './Grid.scss';

export default function GridTitles(props) {
	const { data, measures } = useTimelineContext();

	return (
		<div className={theme.titles} style={{ height: measures.total.heightUnit }}>
			<div
				role="presentation"
				className={`${theme.title}`}
				style={{ height: measures.header.heightUnit }}
			/>
			{data.map(({ id, label, maxLevel = 0 }) => (
				<div
					key={id}
					className={theme.title}
					style={{ height: `${(maxLevel + 1) * measures.row.height}rem` }}
				>
					{label}
				</div>
			))}
		</div>
	);
}

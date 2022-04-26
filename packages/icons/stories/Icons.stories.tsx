import React, { Suspense } from 'react';

import { importIcon } from '../src';

const Icon = ({ size, name }: { size: number; name: string }) => {
	const LazyIcon = React.lazy(
		() => new Promise(resolve => importIcon(size, name).then(icon => resolve(icon))),
	);
	return (
		<div>
			<Suspense fallback={<span>Loading...</span>}>
				<LazyIcon />
			</Suspense>
		</div>
	);
};

/*
export const iconTokens = {
	'neutral/icon': '#202020',
	'accent/icon': '#0c78c2',
	'warning/icon': '#e25c10',
	'danger/icon': '#d93335',
	'beta/icon': '#aa2de8',
};
export const IconColorTokenSelect = () => (
	<select
		onChange={e => {
			const sections = document.getElementsByTagName('svg');
			console.log(e.currentTarget.value, sections);
			[...sections].forEach(element => (element.style = `color: ${e.currentTarget.value};`));
		}}
	>
		{Object.entries(iconTokens).map(([name, value]) => (
			<option value={value}>{name}</option>
		))}
	</select>
);
*/

export default {
	title: 'Icons',
	component: Icon,
};

export const UserIcon = {
	args: {
		size: 8,
		name: 'user',
	},
};

export const TalendIcon = {
	args: {
		name: 'logo-square',
	},
	decorators: [
		Story => (
			<div style={{ width: '2em', height: '2em' }}>
				<Story />
			</div>
		),
	],
};

export const ProjectIcon = {
	args: {
		size: 24,
		name: 'projects',
	},
};

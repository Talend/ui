const React = require('react');

const icons = require('../src/icon').default;

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

function getNumericSizeByTShirtSize(tShirtSize) {
	switch (tShirtSize) {
		case 'XS':
			return 8;
		case 'S':
			return 12;
		case 'M':
			return 16;
		case 'L':
			return 24;
		default:
			return '?';
	}
}

const Icon = ({ name, size, svg, ...rest }) => {
	const sizeInPx = getNumericSizeByTShirtSize(size) + 'px';
	return (
		<span
			{...rest}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: sizeInPx,
				width: sizeInPx,
			}}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
};

const iconsByName: Record<string, { [key: string]: Object }> = {};
Object.entries(icons)
	.filter(([size]) => sizes.find(s => s === size))
	.forEach(([size, icons]) => {
		Object.entries(icons).forEach(([iconName, iconValue]) => {
			if (!iconsByName[iconName]) {
				// @ts-ignore
				iconsByName[iconName] = {};
			}
			if (!iconsByName[iconName][size]) {
				// @ts-ignore
				iconsByName[iconName][size] = iconValue;
			}
		});
		return iconsByName;
	});

const iconStories = {};
Object.entries(iconsByName).forEach(([iconName, iconValues]) => {
	// @ts-ignore
	iconStories[iconName] = props =>
		Object.entries(iconValues).map(([iconSize, iconValue]) => (
			<Icon name={iconName} size={iconSize} svg={iconValue} {...props} />
		));
});

module.exports = {
	...iconStories,
	default: {
		title: 'Icon',
		component: Icon,
		decorators: [
			storyFn => (
				<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>{storyFn()}</div>
			),
		],
	},
};

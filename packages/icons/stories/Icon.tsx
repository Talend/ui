import * as React from 'react';
import { IconItem as StorybookIconItem } from '@storybook/addon-docs';

import tokens from '@talend/design-tokens';

import { infoFromFigma as icons } from '../dist/info';
import { useCopyToClipboard } from 'react-use';
import { PropsWithChildren } from 'react';

const iconColorTokens = {
	'neutral/icon': tokens.coralColorNeutralIcon,
	'accent/icon': tokens.coralColorAccentIcon,
	'warning/icon': tokens.coralColorWarningIcon,
	'danger/icon': tokens.coralColorDangerIcon,
	'beta/icon': tokens.coralColorBetaIcon,
};

export const iconSizes = {
	XS: 8,
	S: 12,
	M: 16,
	L: 24,
};

const legacyIconSizes = {
	XS: '0.8rem',
	SM: '1.2rem',
	MD: '1.6rem',
	LG: '2.4rem',
};

export const realIconSizes: (keyof typeof iconSizes)[] = [
	...Array.from(new Set(Object.values(icons) as (keyof typeof iconSizes)[])),
].sort((a, b) => parseInt(a) - parseInt(b));

export const realIconNames = [
	...Array.from(new Set(Object.keys(icons).map(icon => icon.split(':')[0]))),
].sort();

export const getRealSize = (size: keyof typeof iconSizes) => {
	return iconSizes[size];
};

export const getTShirtSize = (size: keyof typeof iconSizes) => {
	return (Object.keys(iconSizes) as (keyof typeof iconSizes)[]).find(
		iconSize => iconSizes[iconSize] === parseInt(size),
	);
};

const IconColorTokenPicker = () => (
	<select
		onChange={e => {
			Array.from(document.getElementsByTagName('use')).forEach(element => {
				element.style.color = e.currentTarget.value;
			});
		}}
	>
		{Object.entries(iconColorTokens).map(([name, value], index) => (
			<option key={index} value={value}>
				{name}
			</option>
		))}
	</select>
);

export const IconToolbar = () => (
	<form>
		<IconColorTokenPicker />
	</form>
);

const LegacyIconSizePicker = () => (
	<div className="form-group">
		<label htmlFor="select-size" className="sr-only">
			Icon size
		</label>
		<select
			id="select-size"
			className="form-control"
			onChange={e => {
				const size = e.currentTarget.value;
				Array.from(
					document.querySelectorAll('.sb-docs.sb-docs-svg svg') as NodeListOf<SVGSVGElement>,
				).forEach(element => {
					element.style.width = size;
					element.style.height = size;
				});
			}}
			defaultValue={Object.values(legacyIconSizes)[Object.values(legacyIconSizes).length - 1]}
		>
			{Object.entries(legacyIconSizes).map(([name, value], index) => (
				<option key={index} value={value}>
					{name}
				</option>
			))}
		</select>
	</div>
);

const LegacyIconFilterPicker = () => (
	<div className="form-group">
		<label htmlFor="select-filter" className="sr-only">
			Select filter
		</label>
		<select
			id="select-filter"
			className="form-control"
			onChange={e => {
				Array.from(document.querySelectorAll('.sb-docs.sb-docs-svg')).forEach(element => {
					element.setAttribute('class', 'sb-docs sb-docs-svg ' + e.currentTarget.value);
				});
			}}
		>
			<option value="no-filter">No filter</option>
			<option value="colormapping">Color mapping</option>
			<option value="grayscale">grayscale</option>
		</select>
	</div>
);

export const LegacyIconToolbar = () => (
	<form className="form form-inline">
		<LegacyIconSizePicker />
		<LegacyIconFilterPicker />
	</form>
);

export const HiddenIconItem = () => {
	const ref = React.createRef<HTMLDivElement>();
	React.useLayoutEffect(() => {
		const hook = ref.current;
		if (hook) {
			const wrapper = hook?.parentNode?.parentNode;
			if (wrapper) {
				(wrapper as HTMLDivElement).style.visibility = 'hidden';
			}
		}
	}, [ref]);
	return (
		<StorybookIconItem name="">
			<div ref={ref} />
		</StorybookIconItem>
	);
};

export const IconItem = ({
	name,
	children,
	...rest
}: PropsWithChildren<typeof StorybookIconItem>) => {
	const ref = React.createRef<HTMLDivElement>();
	const [, copyToClipboard] = useCopyToClipboard();
	const onClickHandler = () => {
		const nameToCopy = name.split(':')[0];
		copyToClipboard(nameToCopy);
		alert(`"${nameToCopy}" has been copied to clipboard`);
	};
	React.useLayoutEffect(() => {
		const hook = ref.current;
		if (hook) {
			const element = hook?.childNodes[0];
			if (element) {
				hook.className = (element as HTMLDivElement).className;
			}
		}
	}, [ref]);
	return (
		<StorybookIconItem name={name} {...rest}>
			<div role="button" onClick={onClickHandler} onKeyPress={onClickHandler} tabIndex={0}>
				{children}
			</div>
		</StorybookIconItem>
	);
};

const Icon = ({ name, size }: { name: string; size?: keyof typeof iconSizes }) => {
	if (!name) {
		return <svg />;
	}
	const realSize = size ? getRealSize(size) : undefined;
	const fullName = size ? name.split(':')[0] + ':' + realSize : name;
	return (
		<div className="sb-docs sb-docs-svg">
			<svg style={size ? { width: realSize, height: realSize } : {}}>
				<use xlinkHref={'#' + fullName} />
			</svg>
		</div>
	);
};

Icon.displayName = 'Icon';

export default Icon;

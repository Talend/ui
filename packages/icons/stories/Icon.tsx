import { createContext, useContext, useState } from 'react';
import type { ChangeEvent, PropsWithChildren } from 'react';
import { useCopyToClipboard } from 'react-use';

import tokens from '@talend/design-tokens';

import { infoFromFigma as icons } from '../dist/info';
import metadata from '../src/metadata.json';

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

export const getRealSize = (size: keyof typeof iconSizes) => iconSizes[size];

export const realIconSizes: (keyof typeof iconSizes)[] = [
	...Array.from(new Set(Object.values(icons) as (keyof typeof iconSizes)[])),
].sort((a, b) => getRealSize(b) - getRealSize(a));

export const realIconNames = [
	...Array.from(new Set(Object.keys(icons).map(icon => icon.split(':')[0]))),
].sort();

export const getIconNamesBySize = (size: keyof typeof iconSizes) => {
	const sizeInLowerCase = size.toLocaleLowerCase();
	return Object.keys(icons)
		.filter(key => key.toLocaleLowerCase().endsWith(':' + sizeInLowerCase))
		.map(key => key.split(':')[0])
		.sort();
};

const SearchContext = createContext({
	query: '',
	setQuery: (value: string) => {},
});

const IconFilter = () => {
	const searchContext = useContext(SearchContext);

	const onFilter = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		searchContext.setQuery(value);
	};

	return (
		<div className="form-group">
			<label htmlFor="query" className="control-label">
				Filter
			</label>
			<input
				id="query"
				className="form-control"
				type="search"
				onChange={onFilter}
				placeholder={'Filter on name or desc...'}
			/>
		</div>
	);
};

const LegacyIconContext = createContext({
	size: '',
	setSize: (value: string) => {},
	filter: '',
	setFilter: (value: string) => {},
});

const LegacyIconSizePicker = () => {
	const legacyIconContext = useContext(LegacyIconContext);
	return (
		<div className="form-group">
			<label htmlFor="select-size">Icon size</label>
			<select
				id="select-size"
				className="form-control"
				onChange={e => legacyIconContext.setSize(e.currentTarget.value)}
				defaultValue={Object.values(legacyIconSizes).pop()}
			>
				{Object.entries(legacyIconSizes).map(([name, value], index) => (
					<option key={index} value={value}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
};

const LegacyIconFilterPicker = () => {
	const legacyIconContext = useContext(LegacyIconContext);
	return (
		<div className="form-group">
			<label htmlFor="select-filter" className="control-label">
				Select filter
			</label>
			<select
				id="select-filter"
				className="form-control"
				onChange={e => legacyIconContext.setFilter(e.currentTarget.value)}
			>
				<option value="no-filter">No filter</option>
				<option value="colormapping">Color mapping</option>
				<option value="grayscale">grayscale</option>
			</select>
		</div>
	);
};

export const LegacyIconToolbar = () => {
	return (
		<form className="form">
			<LegacyIconSizePicker />
			<LegacyIconFilterPicker />
		</form>
	);
};

const IconContext = createContext({
	color: '',
	setColor: (value: string) => {},
});

const IconColorTokenPicker = () => {
	const iconContext = useContext(IconContext);
	return (
		<div className="form-group">
			<label htmlFor="color" className="control-label">
				Color
			</label>
			<select
				id="color"
				className="form-control"
				onChange={e => iconContext.setColor(e.currentTarget.value)}
			>
				{Object.entries(iconColorTokens).map(([name, value], index) => (
					<option key={index} value={value}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
};

const IconToolbar = () => {
	return (
		<form className="form">
			<IconColorTokenPicker />
			<IconFilter />
		</form>
	);
};

export const Grid = ({
	columns = 1,
	children,
}: PropsWithChildren<HTMLElement> & { columns?: number }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
			}}
		>
			{children}
		</div>
	);
};

const IconList = (props: PropsWithChildren<any>) => (
	<div {...props} style={{ paddingBlock: tokens.coralSpacingM }} />
);

export const IconGallery = ({ children }: PropsWithChildren<HTMLElement>) => {
	const [color, setColor] = useState('');
	const [query, setQuery] = useState('');
	return (
		<IconContext.Provider value={{ color, setColor }}>
			<SearchContext.Provider value={{ query, setQuery }}>
				<IconToolbar />
				<IconList>{children}</IconList>
			</SearchContext.Provider>
		</IconContext.Provider>
	);
};

export const LegacyIconGallery = ({ children }: PropsWithChildren<HTMLElement>) => {
	const [size, setSize] = useState('');
	const [filter, setFilter] = useState('');
	const [query, setQuery] = useState('');
	return (
		<LegacyIconContext.Provider value={{ size, setSize, filter, setFilter }}>
			<SearchContext.Provider value={{ query, setQuery }}>
				<LegacyIconToolbar />
				<IconList>{children}</IconList>
			</SearchContext.Provider>
		</LegacyIconContext.Provider>
	);
};

export const IconItem = ({
	name,
	size,
	...rest
}: {
	name: string;
	size?: 'XS' | 'S' | 'M' | 'L' | undefined;
}) => {
	const searchContext = useContext(SearchContext);
	const [, copyToClipboard] = useCopyToClipboard();

	const onTextClickHandler = () => {
		const nameToCopy = name.split(':')[0];
		copyToClipboard(nameToCopy);
		alert(`"${nameToCopy}" has been copied to clipboard`);
	};

	const onIconClickHandler = () => {
		var svgData = document.getElementById(`${name}:${size}`)?.getElementsByTagName('svg')[0];
		if (svgData) {
			svgData.removeAttribute('width');
			svgData.removeAttribute('height');

			var svgBlob = new Blob([svgData?.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
			var svgUrl = URL.createObjectURL(svgBlob);
			var downloadLink = document.createElement('a');
			downloadLink.href = svgUrl;
			downloadLink.download = `${name}-${size}.svg`;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
	};
	const iconMetadata = metadata.find(data => data.name.endsWith(size + '/' + name));
	const isFound = size
		? iconMetadata &&
		  Object.values(iconMetadata).some(property =>
				property.toString().toLocaleLowerCase().includes(searchContext.query),
		  )
		: true;
	return (
		<div {...rest}>
			{isFound ? (
				<div
					style={{
						display: 'flex',
						gap: tokens.coralSpacingM,
						paddingBlock: tokens.coralSpacingXs,
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: tokens.coralSizingM,
							height: tokens.coralSizingM,
							border: `${tokens.coralBorderSSolid} ${tokens.coralColorNeutralBorderWeak}`,
							boxShadow: tokens.coralElevationShadowAccent,
							borderRadius: tokens.coralRadiusS,
						}}
					>
						<div role="button" onClick={onIconClickHandler} tabIndex={0}>
							<Icon size={size} name={name} />
						</div>
					</div>
					<div
						role="button"
						onClick={onTextClickHandler}
						tabIndex={0}
						style={{
							flex: 1,
							font: tokens.coralParagraphM,
						}}
					>
						{size ? (
							<dl
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr 3fr',
								}}
							>
								<dt>Name</dt>
								<dd>{name}</dd>
								{size && (
									<>
										<dt>Size</dt>
										<dd>{size}</dd>
									</>
								)}
								{iconMetadata &&
									'description' in iconMetadata &&
									iconMetadata.description.length > 0 && (
										<>
											<dt style={{ color: tokens.coralColorNeutralTextWeak }}>Desc</dt>
											<dd style={{ color: tokens.coralColorNeutralTextWeak }}>
												{iconMetadata.description}
											</dd>
										</>
									)}
							</dl>
						) : (
							<span>{name}</span>
						)}
					</div>
				</div>
			) : (
				<div />
			)}
		</div>
	);
};

export const HiddenIconItem = () => {
	return <div aria-hidden />;
};

const Icon = ({ name, size }: { name: string; size?: keyof typeof iconSizes }) => {
	const iconContext = useContext(IconContext);
	const legacyIconContext = useContext(LegacyIconContext);
	const style = {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'initial',
		},
		styleWithSize = { width: 'auto', height: 'auto' };
	let className = '';
	if (iconContext.color) {
		style.color = iconContext.color;
	}
	if (legacyIconContext.size) {
		const { size } = legacyIconContext;
		styleWithSize.width = size;
		styleWithSize.height = size;
	}
	if (legacyIconContext.filter) {
		className = legacyIconContext.filter;
	}
	if (size) {
		const realSize = getRealSize(size).toString();
		styleWithSize.width = realSize;
		styleWithSize.height = realSize;
	}
	if (!name) {
		return null;
	}
	const fullName = size ? name.split(':')[0] + ':' + size : name;
	return (
		<div className={className} style={style}>
			<svg style={styleWithSize} shapeRendering="geometricPrecision">
				<use xlinkHref={'#' + fullName} />
			</svg>
		</div>
	);
};

Icon.displayName = 'Icon';

export default Icon;

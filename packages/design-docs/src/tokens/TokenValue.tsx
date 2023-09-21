/* eslint-disable @talend/import-depth */
import { ReactNode, useState } from 'react';
import { SizedIcon, StackVertical, StackHorizontal, ButtonTertiary } from '@talend/design-system';
import tokens from '@talend/design-tokens';
import dictionary from '@talend/design-tokens/lib/light/dictionary';
import { ColorToken } from '@talend/design-tokens/lib/types';
import * as utils from './TokenFormatter';
import theme from './TokenValue.module.scss';
import ColorChecker from './ColorChecker';
import colorCompositionData from './ColorCompositions.json';
import { background } from '@storybook/theming';

type TokenValueProps = {
	children: string;
	lang?: string;
};

function copy(svalue: string) {
	let value = svalue;
	if (Array.isArray(svalue)) {
		value = svalue.join('');
	}

	if (navigator.clipboard) {
		navigator.clipboard.writeText(value);
	}
}

export function TokenValue({ children, lang }: TokenValueProps) {
	return (
		<button
			className={theme.btn}
			style={{ border: 'none', background: 'none' }}
			onClick={() => copy(children)}
		>
			<span className={theme.lang}>{lang}</span>
			<span>{children}</span>
			<SizedIcon size="S" name="copy" />
		</button>
	);
}

type TokenListProps = {
	style: (token: any) => React.CSSProperties;
	type: string;
	children: string | ((token: any) => ReactNode);
	category?: string;
	categories?: string[];
	sortOnValue?: boolean;
};

function compareTokensByValue(a: any, b: any) {
	return a.value
		.replace('rem', '')
		.localeCompare(b.value.replace('rem', ''), undefined, { numeric: true });
}

export function TokenList({
	categories,
	category,
	style,
	type,
	sortOnValue,
	children,
}: TokenListProps) {
	const [search, setSearch] = useState(category);
	const safeCategories = categories || [];
	const filtered = dictionary.filter(t => {
		const sameType = t.type === type;
		const sameCategory = search ? utils.getDisplayName(t.name).split('/')[0] === search : true;
		return sameType && sameCategory;
	});
	if (sortOnValue) {
		filtered.sort(compareTokensByValue);
	}
	return (
		<>
			<div>
				{safeCategories.map(categ => (
					<ButtonTertiary key={categ} onClick={() => setSearch(categ)} disabled={categ === search}>
						{categ}
					</ButtonTertiary>
				))}
			</div>
			<StackVertical gap="M">
				{filtered.map(token => (
					<StackHorizontal gap="M" align="stretch" key={token.name}>
						<div
							style={{
								minHeight: '8rem',
								width: 200,
								verticalAlign: 'middle',
								border: '1px solid #ccc',
								borderRadius: tokens.coralRadiusM,
								boxShadow: tokens.coralElevationShadowNeutralM,
								padding: tokens.coralSpacingS,
								...style(token),
							}}
						>
							{typeof children === 'function' ? children(token) : children}
						</div>
						<dl style={{ margin: 0 }}>
							<dt>{utils.getDisplayName(token.name)}</dt>
							<dd style={{ width: 300 }}>{token.description}</dd>
						</dl>
						<ul style={{ listStyleType: 'none' }}>
							<li>
								<TokenValue lang="SCSS">{utils.getScssName(token.name)}</TokenValue>
							</li>
							<li>
								<TokenValue lang="CSS">{utils.getCssName(token)}</TokenValue>
							</li>
							<li>
								<TokenValue lang="JS">{`tokens.${token.name}`}</TokenValue>
							</li>
						</ul>
					</StackHorizontal>
				))}
			</StackVertical>
		</>
	);
}

export function CardComposition({
	backgroundColor,
	textColor,
	borderColor,
	iconColor,
	isActive = false,
	isHover = false,
	...props
}: {
	textColor: ColorToken;
	backgroundColor: ColorToken;
	borderColor: ColorToken;
	iconColor?: ColorToken;
	isActive?: boolean;
	isHover?: boolean;
}) {
	return (
		<div
			{...props}
			style={{
				border: '1px solid',
				borderRadius: tokens.coralRadiusM,
				background: backgroundColor.value,
				borderColor: borderColor.value,
				color: textColor.value,
			}}
		>
			<p>
				<span style={{ color: iconColor.value }}>
					<SizedIcon size="S" name="overview" />
				</span>
				{isHover && <span>On hover</span>}
				{isActive && <span>While clicked</span>}
				{!isHover && !isActive && <span>Lorem ipsum</span>}
			</p>
			{textColor && backgroundColor && (
				<span>
					<ColorChecker text={textColor} background={backgroundColor} />
				</span>
			)}
		</div>
	);
}

function onlyUnique(value, index, array) {
	return array.indexOf(value) === index;
}

export function ColorComposition() {
	const [search, setSearch] = useState('Neutral');
	const backgrounds = colorCompositionData.map(c => c.background).filter(onlyUnique);
	const currentBackgrounds = backgrounds.filter(b => b.startsWith(search));

	return currentBackgrounds.map(bg => {
		const allComposition = colorCompositionData.filter(c => c.background === bg);
		return (
			<StackVertical key={bg} gap="M">
				<h2>{bg}</h2>
				<StackHorizontal gap="M">
					{allComposition.map(compo => (
						<CardComposition
							key={JSON.stringify(compo)}
							textColor={dictionary.find(t => t.name === `coralColor${compo.color}`)}
							backgroundColor={dictionary.find(t => t.name === `coralColor${compo.background}`)}
							borderColor={dictionary.find(t => t.name === `coralColor${compo.border}`)}
							iconColor={dictionary.find(t => t.name === `coralColor${compo.icon}`)}
						/>
					))}
				</StackHorizontal>
			</StackVertical>
		);
	});
}

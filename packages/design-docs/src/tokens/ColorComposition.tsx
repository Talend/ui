/* eslint-disable @talend/import-depth */
import { useState } from 'react';
import { SizedIcon, StackVertical, StackHorizontal, ButtonTertiary } from '@talend/design-system';
import tokens from '@talend/design-tokens';
import dictionary from '@talend/design-tokens/lib/light/dictionary';
import { Token, ColorToken } from '@talend/design-tokens/lib/types';
import * as utils from './TokenFormatter';
import ColorChecker from './ColorChecker';
import colorCompositionData from './ColorCompositions.json';
import theme from './ColorComposition.module.scss';

const PADDING = '3rem';

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
	iconColor: ColorToken;
	isActive?: boolean;
	isHover?: boolean;
}) {
	return (
		<div
			{...props}
			className={theme.card}
			style={{
				border: '1px solid',
				borderRadius: tokens.coralRadiusM,
				background: backgroundColor.value,
				borderColor: borderColor.value,
				color: textColor.value,
				width:
					isActive || isHover
						? `calc(${tokens.coralSizingXxxl} - ${PADDING})`
						: tokens.coralSizingXxxl,
				marginLeft: isActive || isHover ? PADDING : 0,
			}}
		>
			<span style={{ color: iconColor.value }}>
				<SizedIcon size="S" name="overview" />
			</span>
			{isHover && <span>On hover</span>}
			{isActive && <span>While clicked</span>}
			{!isHover && !isActive && <span>Lorem ipsum</span>}
			{textColor && backgroundColor && (
				<span className={theme.score}>
					<ColorChecker text={textColor} background={backgroundColor} />
				</span>
			)}
		</div>
	);
}

function onlyUnique(value: any, index: number, array: any[]) {
	return array.indexOf(value) === index;
}

const categories = ['neutral', 'accent', 'success', 'warning', 'beta', 'assistive'];
const backgrounds = colorCompositionData.map(c => c.background).filter(onlyUnique);

type CompositionItem = {
	background: string;
	color: string;
	border: string;
	icon: string;
};

type TokenByName = Record<string, ColorToken>;

const colorDict = dictionary.filter(t => t.type === 'color') as ColorToken[];

const tokenByName = colorDict.reduce<TokenByName>((acc, token) => {
	acc[token.name] = token;
	return acc;
}, {});

function TokenDisplay({ token }: { token: Token }) {
	return (
		<>
			<span
				style={{
					display: 'inline-block',
					marginRight: '0.5rem',
					width: '2rem',
					height: '1rem',
					borderRadius: '30%',
					background: token.value,
				}}
			/>
			{utils.getDisplayName(token.name)}
		</>
	);
}

function ColorCompositionItem({ tokenComposition }: { tokenComposition: CompositionItem }) {
	const isSemantic =
		!tokenComposition.color.includes('Neutral') && !tokenComposition.color.includes('Assistive');
	const iconToken = tokenByName[`coralColor${tokenComposition.icon}`];
	const textToken = tokenByName[`coralColor${tokenComposition.color}`];
	const borderToken = tokenByName[`coralColor${tokenComposition.border}`];

	return (
		<StackVertical gap="XXS">
			<StackHorizontal gap="L" justify="start" align="center">
				<CardComposition
					backgroundColor={tokenByName[`coralColor${tokenComposition.background}`]}
					borderColor={tokenByName[`coralColor${tokenComposition.border}`]}
					textColor={tokenByName[`coralColor${tokenComposition.color}`]}
					iconColor={iconToken}
				/>
				<ul style={{ listStyleType: 'none' }}>
					<li>
						<TokenDisplay token={iconToken} />
					</li>
					<li>
						<TokenDisplay token={textToken} />
					</li>
					<li>
						<TokenDisplay token={borderToken} />
					</li>
				</ul>
			</StackHorizontal>
			{isSemantic && (
				<>
					<StackHorizontal gap="L" justify="start" align="center">
						<CardComposition
							backgroundColor={tokenByName[`coralColor${tokenComposition.background}`]}
							borderColor={tokenByName[`coralColor${tokenComposition.border}Hover`]}
							textColor={tokenByName[`coralColor${tokenComposition.color}Hover`]}
							iconColor={tokenByName[`coralColor${tokenComposition.icon}Hover`]}
							isHover
						/>
						<ul style={{ listStyleType: 'none' }}>
							<li>
								<TokenDisplay token={tokenByName[`coralColor${tokenComposition.icon}Hover`]} />
							</li>
							<li>
								<TokenDisplay token={tokenByName[`coralColor${tokenComposition.color}Hover`]} />
							</li>
							<li>
								<TokenDisplay token={tokenByName[`coralColor${tokenComposition.border}Hover`]} />
							</li>
						</ul>
					</StackHorizontal>
					<StackHorizontal gap="L" justify="start" align="center">
						<CardComposition
							backgroundColor={tokenByName[`coralColor${tokenComposition.background}`]}
							borderColor={tokenByName[`coralColor${tokenComposition.border}Active`]}
							textColor={tokenByName[`coralColor${tokenComposition.color}Active`]}
							iconColor={tokenByName[`coralColor${tokenComposition.icon}Active`]}
							isActive
						/>
						<ul style={{ listStyleType: 'none' }}>
							<li>
								<TokenDisplay token={tokenByName[`coralColor${tokenComposition.icon}Active`]} />
							</li>
							<li>
								<TokenDisplay token={tokenByName[`coralColor${tokenComposition.color}Active`]} />
							</li>
							<li>
								<TokenDisplay token={tokenByName[`coralColor${tokenComposition.border}Active`]} />
							</li>
						</ul>
					</StackHorizontal>
				</>
			)}
		</StackVertical>
	);
}

export function ColorComposition() {
	const [search, setSearch] = useState('neutral');
	const currentBackgrounds = backgrounds.filter(b => b.toLowerCase().startsWith(search));

	return (
		<StackVertical gap="S">
			<StackHorizontal gap="M">
				{categories.map(categ => (
					<ButtonTertiary key={categ} onClick={() => setSearch(categ)} disabled={categ === search}>
						{categ}
					</ButtonTertiary>
				))}
			</StackHorizontal>
			{currentBackgrounds.map(bg => {
				const allComposition = colorCompositionData.filter(c => c.background === bg);
				return (
					<StackVertical key={bg} gap="M">
						<h2>{bg}</h2>
						<div className={theme.grid}>
							{allComposition.map(compo => (
								<ColorCompositionItem key={JSON.stringify(compo)} tokenComposition={compo} />
							))}
						</div>
					</StackVertical>
				);
			})}
		</StackVertical>
	);
}

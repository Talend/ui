// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import {ColorToken, Dictionary, Token, TokenType} from '../types';

import CompositeColors from './CompositeColors.json';

import S from './Tokens.scss';

type TokensProps = React.PropsWithChildren<any> & {
	filter: string;
	tokens: Dictionary;
};

type PropsWithToken = {
	// eslint-disable-next-line react/no-unused-prop-types
	token: Token;
};

const SemanticColors = ['Accent', 'Danger', 'Warning', 'Success', 'Beta'];

const tShirtSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

const groupByType = (collection: Dictionary) => {
	return collection.reduce(
		(acc, cur) => {
			(acc[cur.type] = acc[cur.type] || []).push(cur);
			return acc;
		},
		{} as Record<TokenType, Token[]>,
	);
};

const getDisplayName = (name: string) => {
	if (!name) return '';
	const nameArray = name.replace(/^coral/i, '').replace(/^color/i, '').split(/(?=[A-Z])/);
	return nameArray
		.map((word: string, index: number, words: string[]) => {
			let adapted = tShirtSizes.some(
				tShirtSize => word.toLocaleLowerCase() === tShirtSize,
			)
				? word.toLocaleUpperCase()
				: word.toLocaleLowerCase();
			if (index === 0 && index < words.length - 1) {
				adapted += '/';
			} else if (index < words.length - 1) {
				adapted += '-';
			}
			return adapted;
		})
		.join('');
};

const getCssName = (name?: string) => {
	if (!name) return '';
	const nameArray = name.split(/(?=[A-Z])/);
	return `--${  nameArray
		.map((word: string, index: number, words: string[]) => {
			let adapted = word.toLocaleLowerCase();
			if (index < words.length - 1) {
				adapted += '-';
			}
			return adapted;
		})
		.join('')}`;
};

const TokenSkeleton = () => (
	<div style={{
			height: '5rem',
			width: '5rem',
			background: '#EFEFEF',
			borderRadius: '4px',
		}}
	/>
);

const DefinitionListTokens = ({ tokens, filter, children }: TokensProps) => (
	<dl>
		{(tokens as Token[]).map(token => (
			(!filter.length || token.name.toLocaleLowerCase().includes(filter.toLocaleString())) ? [
					<dt>{getDisplayName(token.name)}</dt>,
					<dd>
						<figure>
							{children({ token })}
							<figcaption>
								<dl>
									<dt>{getCssName(token.name)}</dt>
									<dd>{token.value}</dd>
								</dl>
							</figcaption>
						</figure>
					</dd>
			] : <TokenSkeleton />))}
	</dl>
);

const BorderTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<hr
				className={S.border}
				style={{
					border: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const BrandingTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.branding}
				style={{
					backgroundImage: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const BreakpointTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<hr
				className={S.breakpoint}
				style={{
					width: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const Color = ({ color }) => (
	<div>
		<small>{getDisplayName(color?.name)}</small>
		<br />
		<small>{color?.hex}</small>
	</div>
);

const ColorCard = ({ icon, color, background, border }) => (
	<div className={S.colorContent} style={{ color: color?.value}}>
		<div>
			<span
				className={S.colorIcon}
				style={{
					background: `${icon?.value}`
				}}
			/>
			<Color color={icon} />
		</div>
		<div>
			<span
				className={S.colorText}
			/>
			<Color color={color} />
		</div>
	</div>
);

const ColorTokens = ({ tokens, filter }: TokensProps) => {
	return (
		<div className={S.colorGrid}>
			{
				CompositeColors.map(({icon: iconK, color: colorK, background: backgroundK, border:borderK}, key) => {
					if (!backgroundK) {
						return <div />;
					}
					const icon = tokens.find((token: ColorToken) => token.name.endsWith(iconK || ''));
					const iconHover = tokens.find((token: ColorToken) => token.name.endsWith(`${iconK}Hover`));
					const iconActive = tokens.find((token: ColorToken) => token.name.endsWith(`${iconK}Active`));

					const color = tokens.find((token: ColorToken) => token.name.endsWith(colorK || ''));
					const colorHover = tokens.find((token: ColorToken) => token.name.endsWith(`${colorK}Hover`));
					const colorActive = tokens.find((token: ColorToken) => token.name.endsWith(`${colorK}Active`));

					const background = tokens.find((token: ColorToken) => token.name.endsWith(backgroundK));
					const backgroundHover = tokens.find((token: ColorToken) => token.name.endsWith(`${backgroundK}Hover`));
					const backgroundActive = tokens.find((token: ColorToken) => token.name.endsWith(`${backgroundK}Active`));

					const border = tokens.find((token: ColorToken) => token.name.endsWith(borderK || ''));
					const borderHover = tokens.find((token: ColorToken) => token.name.endsWith(`${borderK}Hover`));
					const borderActive = tokens.find((token: ColorToken) => token.name.endsWith(`${borderK}Active`));

					const hasSemanticColor = SemanticColors.some(semanticColor => colorK?.includes(semanticColor));
					const hasSemanticBackground = SemanticColors.some(semanticColor => backgroundK?.includes(semanticColor));

					return (
						<div className={S.colorSwatch}>
							{(hasSemanticBackground ? ['DEFAULT', 'HOVER', 'ACTIVE'] : ['DEFAULT']).map(
							(state, appendix) => {
								let iconColor = icon;
								let textColor = color;
								let backgroundColor = background;
								let borderColor = border;

								switch (state) {
									case 'HOVER':
										iconColor = iconHover;
										textColor = colorHover;
										backgroundColor = backgroundHover;
										borderColor = borderHover;
										break;
									case 'ACTIVE':
										iconColor = iconActive;
										textColor = colorActive;
										backgroundColor = backgroundActive;
										borderColor = borderActive;
										break;
									default:
										break;
								}

								return !filter.length || [iconColor, textColor, backgroundColor, borderColor].some(c => c?.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
									||c?.hex.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) ? (
									<div
										key={`${key}${appendix}`}
										className={S.colorBackground}
											style={{
												color: `${textColor?.value}`,
												background: `${backgroundColor?.value}`,
												borderColor: `${borderColor?.value}`
											}}
									>
											<Color color={backgroundColor} />

											<ColorCard icon={iconColor} color={textColor} background={backgroundColor} border={borderColor} />

											{(hasSemanticColor && ! hasSemanticBackground) && (
												<>
													<ColorCard icon={iconHover} color={colorHover} background={backgroundHover} border={borderHover} />
													<ColorCard icon={iconActive} color={colorActive} background={backgroundActive} border={borderActive} />
												</>
											)}

											<Color color={borderColor} />
									</div>
								) : <TokenSkeleton />;
							}
						)}
						</div>
					);
				})
			}
		</div>
	);
};

const GradientTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.gradient}
				style={{
					background: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const MeasureTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.measure}
				style={{
					width: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const OpacityTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.opacity}
			>
				<div
					style={{
						opacity: token.value,
					}}
				>
					Lorem ipsum
				</div>
			</div>
		)}
	</DefinitionListTokens>
);

const RadiusTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.radius}
				style={{
					borderRadius: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const ShadowTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.shadow}
				style={{
					boxShadow: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

const TypographyTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				style={{
					font: token.value,
				}}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</div>
		)}
	</DefinitionListTokens>
);

const Tokens = ({ dictionary }: { dictionary: Dictionary }) => {
	const [filter, setFilter ] = React.useState('');
	return (
		<div>
			<input aria-label="Search for a token" type="search" onChange={e => setFilter(e.currentTarget.value)} />
			{Object.entries(groupByType(dictionary)).map(([type, tokens], index) => (
				<section key={index}>
					<h2 className="sbdocs sbdocs-h2">{type}</h2>
					<div>
						{type === TokenType.BORDER && <BorderTokens filter={filter} tokens={tokens} />}
						{type === TokenType.BREAKPOINT && <BreakpointTokens filter={filter} tokens={tokens} />}
						{type === TokenType.COLOR && <ColorTokens filter={filter} tokens={tokens} />}
						{type === TokenType.TYPOGRAPHY && <TypographyTokens filter={filter} tokens={tokens} />}
						{type === TokenType.GRADIENT && <GradientTokens filter={filter} tokens={tokens} />}
						{type === TokenType.BRANDING && <BrandingTokens filter={filter} tokens={tokens} />}
						{type === TokenType.MEASURE && <MeasureTokens filter={filter} tokens={tokens} />}
						{type === TokenType.OPACITY && <OpacityTokens filter={filter} tokens={tokens} />}
						{type === TokenType.RADIUS && <RadiusTokens filter={filter} tokens={tokens} />}
						{type === TokenType.SHADOW && <ShadowTokens filter={filter} tokens={tokens} />}
					</div>
				</section>
			))}
  		</div>
	);
};

export default Tokens;

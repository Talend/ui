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

const getScssName = (name?: string) => {
	if (!name) return '';
	return `$${name}`;
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
	<dl className={S.tokens}>
		{(tokens as Token[]).map(token => (
			(!filter.length || token.name.toLocaleLowerCase().includes(filter.toLocaleString())) ? (
				<div className={S.token}>
					<dt className={S.tokenKey}>{getDisplayName(token.name)}</dt>
					<div className={S.tokenValue}>
						<dd className={S.tokenValueDemo}>
							{typeof children === 'function' ? children({ token }) : children}
						</dd>
						<dd className={S.tokenValueCustomProperty}><code>{getScssName(token.name)}</code></dd>
						<dd className={S.tokenValueCustomProperty}><code>{getCssName(token.name)}</code></dd>
						<dd className={S.tokenValueCss}><code>{token.value}</code></dd>
					</div>
				</div>
			) : <TokenSkeleton />))}
	</dl>
);

const BorderTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<hr
				className={S.border}
				style={{
					borderBottom: token.value,
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

const Color = ({ color, ...rest }: { color: ColorToken }) => (
	<div {...rest}>
		<small>{getDisplayName(color?.name)}</small>
		<br />
		<small>{color?.hex}</small>
	</div>
);

const ColorCard = ({ icon, color }: { icon: ColorToken, color: ColorToken}) => (
	<div className={S.colorContent} style={{ color: color?.value}}>
		<div>
			<span
				className={S.colorIcon}
				aria-hidden
				style={{
					background: `${icon?.value}`
				}}
			/>
			<Color color={icon} />
		</div>
		<div>
			<span
				className={S.colorText}
				aria-hidden
			/>
			<Color color={color} />
		</div>
	</div>
);

const ColorTokens = ({ tokens, filter }: TokensProps) => {
	const colorTokens = tokens.reduce((acc:Record<string, ColorToken>, curr:ColorToken) => {
			acc[curr.name.replace('coralColor', '')] = curr;
			return acc;
		}, {});
	return (
		<div className={S.colorGrid}>
			{
				CompositeColors.map(({icon: iconK = '', color: colorK = '', background: backgroundK = '', border:borderK = ''}, key) => {
					if (!backgroundK) {
						return <div />;
					}

					const icon = colorTokens[iconK];
					const iconHover = colorTokens[`${iconK}Hover`];
					const iconActive = colorTokens[`${iconK}Active`];

					const color = colorTokens[colorK];
					const colorHover = colorTokens[`${colorK}Hover`];
					const colorActive = colorTokens[`${colorK}Active`];

					const background = colorTokens[backgroundK];
					const backgroundHover = colorTokens[`${backgroundK}Hover`];
					const backgroundActive = colorTokens[`${backgroundK}Active`];

					const border = colorTokens[borderK];
					const borderHover = colorTokens[`${borderK}Hover`];
					const borderActive = colorTokens[`${borderK}Active`];

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

								const shouldDisplay = !filter.length || [iconColor, textColor, backgroundColor, borderColor].some(c => c?.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
									||c?.hex.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

								return shouldDisplay ? (
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

											<ColorCard icon={iconColor} color={textColor} />

											{(hasSemanticColor && ! hasSemanticBackground) && (
												<>
													<ColorCard icon={iconHover} color={colorHover}  />
													<ColorCard icon={iconActive} color={colorActive} />
												</>
											)}

											<Color className={S.colorBorder} color={borderColor} />
									</div>
								) : <TokenSkeleton />;
							}
						)}
						</div>
					);
				})
			}
			{Object.keys(colorTokens)
				.filter(token => token.startsWith('Charts'))
				.filter(token => token.split(/(?=[A-Z])/).length === 2)
				.map(name => {
				const chartColorWeak = colorTokens[`${name}Weak`];
				const chartColorStrong = colorTokens[`${name}Strong`];
				const chartColor = colorTokens[name];
				const chartColorHover = colorTokens[`${name}Hover`];
				return(
					<div
						className={S.colorBackground}
						style={{
						}}
					>
						{name}
						<svg width='100%' height='65px'>
							<g>
								<rect fill={chartColorWeak?.value} width='100%' height='25' />
								<rect fill={chartColorStrong?.value} width='60%' height='25' />
								<rect fill={chartColor?.value} width='35%' height='25' />
								<rect fill={chartColorHover?.value} width='25%' height='25' />
							</g>
						</svg>
						<dl>
							<dt className={S.tokenValueCustomProperty}><code>{getCssName(chartColorHover?.name)}</code></dt>
							<dd className={S.tokenValueCss}><code>{chartColorHover?.hex}</code></dd>
							<dt className={S.tokenValueCustomProperty}><code>{getCssName(chartColor?.name)}</code></dt>
							<dd className={S.tokenValueCss}><code>{chartColor?.hex}</code></dd>
							<dt className={S.tokenValueCustomProperty}><code>{getCssName(chartColorStrong?.name)}</code></dt>
							<dd className={S.tokenValueCss}><code>{chartColorStrong?.hex}</code></dd>
							<dt className={S.tokenValueCustomProperty}><code>{getCssName(chartColorWeak?.name)}</code></dt>
							<dd className={S.tokenValueCss}><code>{chartColorWeak?.hex}</code></dd>
						</dl>
					</div>
				);
			})}
		</div>
	);
};

const ElevationTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.elevation}
				style={{
					boxShadow: `${token.value}px ${token.value}px 0 0`,
					zIndex: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);

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
					className={S.opacityLayer}
					style={{
						opacity: token.value,
					}}
				/>
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

const TransitionTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.transition}
				style={{
					transition: token.value,
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
			{Object.entries(groupByType(dictionary)).map(([type, tokens], index) => {
				let TokensComponent = DefinitionListTokens;
				switch (type) {
					case TokenType.BORDER:
						TokensComponent = BorderTokens;
						break;
					case TokenType.BRANDING:
						TokensComponent = BrandingTokens;
						break;
					case TokenType.BREAKPOINT:
						TokensComponent = BreakpointTokens;
						break;
					case TokenType.COLOR:
						TokensComponent = ColorTokens;
						break;
					case TokenType.ELEVATION:
						TokensComponent = ElevationTokens;
						break;
					case TokenType.GRADIENT:
						TokensComponent = GradientTokens;
						break;
					case TokenType.MEASURE:
						TokensComponent = MeasureTokens;
						break;
					case TokenType.OPACITY:
						TokensComponent = OpacityTokens;
						break;
					case TokenType.RADIUS:
						TokensComponent = RadiusTokens;
						break;
					case TokenType.SHADOW:
						TokensComponent = ShadowTokens;
						break;
					case TokenType.TRANSITION:
						TokensComponent = TransitionTokens;
						break;
					case TokenType.TYPOGRAPHY:
						TokensComponent = TypographyTokens;
						break;
					default:
						break;
				}
				return (
					<section key={index}>
						<h2 className="sbdocs sbdocs-h2">{type}</h2>
						<TokensComponent filter={filter} tokens={tokens} />
					</section>
				);
			})}
  </div>
	);
};

export default Tokens;

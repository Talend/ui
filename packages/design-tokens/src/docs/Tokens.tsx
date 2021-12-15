// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import {  Dictionary, Token, TokenType } from '../types';

import S from './Tokens.scss';

type TokensProps = React.PropsWithChildren<any> & {
	filter: string;
	tokens: Dictionary;
};

type PropsWithToken = {
	// eslint-disable-next-line react/no-unused-prop-types
	token: Token;
};

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

const DefinitionListTokens = ({ tokens, filter, children }: TokensProps) => (
	<dl>
		{(tokens as Token[]).map(token => (
			(!filter.length || token.name.toLocaleLowerCase().includes(filter.toLocaleString())) && [
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
			]))}
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

const ColorTokens = ({ tokens, filter }: TokensProps) => {
	// @ts-ignore
	return (
		<div className={S.colorGrid}>
			{
				[
					{
						icon: 'NeutralIcon',
						color:  'NeutralText',
						background: 'NeutralBackground',
						border: 'NeutralBorder',
					},
					{
						icon: 'NeutralIcon',
						color:  'NeutralText',
						background: 'NeutralBackgroundMedium',
						border: 'NeutralBorder',
					},
					{
						icon: 'NeutralIcon',
						color:  'NeutralText',
						background: 'NeutralBackgroundStrong',
						border: 'NeutralBorder',
					},
					{},
					{
						icon: 'NeutralIconWeak',
						color:  'NeutralTextWeak',
						background: 'NeutralBackground',
						border: 'NeutralBorderWeak',
					},
					{
						icon: 'NeutralIconWeak',
						color:  'NeutralTextWeak',
						background: 'NeutralBackgroundMedium',
						border: 'NeutralBorderWeak',
					},
					{
						icon: 'NeutralIconWeak',
						color:  'NeutralTextWeak',
						background: 'NeutralBackgroundStrong',
						border: 'NeutralBorderWeak',
					},
					{},
					{
						icon: 'NeutralIcon',
						color:  'NeutralText',
						background: 'NeutralBackground',
						border: 'NeutralBorderStrong',
					},
					{
						icon: 'NeutralIcon',
						color:  'NeutralText',
						background: 'NeutralBackgroundMedium',
						border: 'NeutralBorderStrong',
					},
					{
						icon: 'NeutralIcon',
						color:  'NeutralText',
						background: 'NeutralBackgroundStrong',
						border: 'NeutralBorderStrong',
					},
					{},
					{
						icon: 'NeutralIconDisabled',
						color:  'NeutralTextDisabled',
						background: 'NeutralBackground',
						border: 'NeutralBorderDisabled',
					},
					{
						icon: 'NeutralIconDisabled',
						color:  'NeutralTextDisabled',
						background: 'NeutralBackgroundMedium',
						border: 'NeutralBorderDisabled',
					},
					{
						icon: 'NeutralIconDisabled',
						color:  'NeutralTextDisabled',
						background: 'NeutralBackgroundStrong',
						border: 'NeutralBorderDisabled',
					},
					{
						icon: 'NeutralIconDisabled',
						color:  'NeutralTextDisabled',
						background: 'NeutralBackgroundDisabled',
						border: 'NeutralBorderDisabled',
					},
					{
						icon: 'AccentIcon',
						color:  'AccentText',
						background: 'NeutralBackground',
						border: 'AccentBorder',
						withStates: true,
					},
					{
						icon: 'AccentIcon',
						color:  'AccentText',
						background: 'NeutralBackgroundMedium',
						border: 'AccentBorder',
						withStates: true,
					},
					{
						icon: 'AccentIcon',
						color:  'AccentText',
						background: 'NeutralBackgroundStrong',
						border: 'AccentBorder',
						withStates: true,
					},
					{},
					{
						icon: 'DangerIcon',
						color:  'DangerText',
						background: 'NeutralBackground',
						border: 'DangerBorder',
						withStates: true,
					},
					{
						icon: 'DangerIcon',
						color:  'DangerText',
						background: 'NeutralBackgroundMedium',
						border: 'DangerBorder',
						withStates: true,
					},
					{
						icon: 'DangerIcon',
						color:  'DangerText',
						background: 'NeutralBackgroundStrong',
						border: 'DangerBorder',
						withStates: true,
					},
					{},
					{
						icon: 'WarningIcon',
						color:  'WarningText',
						background: 'NeutralBackground',
						border: 'WarningBorder',
						withStates: true,
					},
					{
						icon: 'WarningIcon',
						color:  'WarningText',
						background: 'NeutralBackgroundMedium',
						border: 'WarningBorder',
						withStates: true,
					},
					{
						icon: 'WarningIcon',
						color:  'WarningText',
						background: 'NeutralBackgroundStrong',
						border: 'WarningBorder',
						withStates: true,
					},
					{},
					{
						icon: 'SuccessIcon',
						color:  'SuccessText',
						background: 'NeutralBackground',
						border: 'SuccessBorder',
						withStates: true,
					},
					{
						icon: 'SuccessIcon',
						color:  'SuccessText',
						background: 'NeutralBackgroundMedium',
						border: 'SuccessBorder',
						withStates: true,
					},
					{
						icon: 'SuccessIcon',
						color:  'SuccessText',
						background: 'NeutralBackgroundStrong',
						border: 'SuccessBorder',
						withStates: true,
					},
					{},
					{
						icon: 'BetaIcon',
						color:  'BetaText',
						background: 'NeutralBackground',
						border: 'BetaBorder',
						withStates: true,
					},
					{
						icon: 'BetaIcon',
						color:  'BetaText',
						background: 'NeutralBackgroundMedium',
						border: 'BetaBorder',
						withStates: true,
					},
					{
						icon: 'BetaIcon',
						color:  'BetaText',
						background: 'NeutralBackgroundStrong',
						border: 'BetaBorder',
						withStates: true,
					},
					{},
					{
						icon: 'AccentIconStrong',
						color:  'AccentTextStrong',
						background: 'AccentBackground',
						border: 'AccentBorder',
					},
					{
						icon: 'AccentIconWeak',
						color:  'AccentTextWeak',
						background: 'AccentBackgroundStrong',
						border: 'AccentBorder',
					},
					{
						icon: 'AccentIcon',
						color:  'AccentText',
						background: 'AccentBackgroundWeak',
						border: 'AccentBorder',
					},
					{},
					{
							icon: 'AccentIconStrong',
						color:  'AccentTextStrong',
						background: 'AccentBackgroundHover',
						border: 'AccentBorder',
					},
					{
						icon: 'AccentIconWeakHover',
						color:  'AccentTextWeakHover',
						background: 'AccentBackgroundStrongHover',
						border: 'AccentBorderHover',
					},
					{
						icon: 'AccentIconHover',
						color:  'AccentTextHover',
						background: 'AccentBackgroundWeakHover',
						border: 'AccentBorderHover',
					},
					{},
					{
						icon: 'AccentIconStrong',
						color:  'AccentTextStrong',
						background: 'AccentBackgroundActive',
						border: 'AccentBorderActive',
					},
					{
						icon: 'AccentIconWeakActive',
						color:  'AccentTextWeakActive',
						background: 'AccentBackgroundStrongActive',
						border: 'AccentBorderActive',
					},
					{
						icon: 'AccentIconActive',
						color:  'AccentTextActive',
						background: 'AccentBackgroundWeakActive',
						border: 'AccentBorderActive',
					},
					{},
					{
						icon: 'DangerIconStrong',
						color:  'DangerTextStrong',
						background: 'DangerBackground',
						border: 'DangerBorder',
					},
					{
						icon: 'DangerIconWeak',
						color:  'DangerTextWeak',
						background: 'DangerBackgroundStrong',
						border: 'DangerBorder',
					},
					{
						icon: 'DangerIcon',
						color:  'DangerText',
						background: 'DangerBackgroundWeak',
						border: 'DangerBorder',
					},
					{},
					{
						icon: 'DangerIconStrong',
						color:  'DangerTextStrong',
						background: 'DangerBackgroundHover',
						border: 'DangerBorder',
					},
					{
						icon: 'DangerIconWeakHover',
						color:  'DangerTextWeakHover',
						background: 'DangerBackgroundStrongHover',
						border: 'DangerBorderHover',
					},
					{
						icon: 'DangerIconHover',
						color:  'DangerTextHover',
						background: 'DangerBackgroundWeakHover',
						border: 'DangerBorderHover',
					},
					{},
					{
						icon: 'DangerIconStrong',
						color:  'DangerTextStrong',
						background: 'DangerBackgroundActive',
						border: 'DangerBorderActive',
					},
					{
						icon: 'DangerIconWeakActive',
						color:  'DangerTextWeakActive',
						background: 'DangerBackgroundStrongActive',
						border: 'DangerBorderActive',
					},
					{
						icon: 'DangerIconActive',
						color:  'DangerTextActive',
						background: 'DangerBackgroundWeakActive',
						border: 'DangerBorderActive',
					},
					{},
					{
						icon: 'SuccessIconStrong',
						color:  'SuccessTextStrong',
						background: 'SuccessBackground',
						border: 'SuccessBorder',
					},
					{
						icon: 'SuccessIconWeak',
						color:  'SuccessTextWeak',
						background: 'SuccessBackgroundStrong',
						border: 'SuccessBorder',
					},
					{
						icon: 'SuccessIcon',
						color:  'SuccessText',
						background: 'SuccessBackgroundWeak',
						border: 'SuccessBorder',
					},
					{},
					{
						icon: 'SuccessIconStrong',
						color:  'SuccessTextStrong',
						background: 'SuccessBackgroundHover',
						border: 'SuccessBorder',
					},
					{
						icon: 'SuccessIconWeakHover',
						color:  'SuccessTextWeakHover',
						background: 'SuccessBackgroundStrongHover',
						border: 'SuccessBorderHover',
					},
					{
						icon: 'SuccessIconHover',
						color:  'SuccessTextHover',
						background: 'SuccessBackgroundWeakHover',
						border: 'SuccessBorderHover',
					},
					{},
					{
						icon: 'SuccessIconStrong',
						color:  'SuccessTextStrong',
						background: 'SuccessBackgroundActive',
						border: 'SuccessBorderActive',
					},
					{
						icon: 'SuccessIconWeakActive',
						color:  'SuccessTextWeakActive',
						background: 'SuccessBackgroundStrongActive',
						border: 'SuccessBorderActive',
					},
					{
						icon: 'SuccessIconActive',
						color:  'SuccessTextActive',
						background: 'SuccessBackgroundWeakActive',
						border: 'SuccessBorderActive',
					},
					{},

					{
						icon: 'WarningIconStrong',
						color:  'WarningTextStrong',
						background: 'WarningBackground',
						border: 'WarningBorder',
					},
					{
						icon: 'WarningIconWeak',
						color:  'WarningTextWeak',
						background: 'WarningBackgroundStrong',
						border: 'WarningBorder',
					},
					{
						icon: 'WarningIcon',
						color:  'WarningText',
						background: 'WarningBackgroundWeak',
						border: 'WarningBorder',
					},
					{},

					{
						icon: 'WarningIconStrong',
						color:  'WarningTextStrong',
						background: 'WarningBackgroundHover',
						border: 'WarningBorder',
					},
					{
						icon: 'WarningIconWeakHover',
						color:  'WarningTextWeakHover',
						background: 'WarningBackgroundStrongHover',
						border: 'WarningBorderHover',
					},
					{
						icon: 'WarningIconHover',
						color:  'WarningTextHover',
						background: 'WarningBackgroundWeakHover',
						border: 'WarningBorderHover',
					},
					{},
					{
						icon: 'WarningIconStrong',
						color:  'WarningTextStrong',
						background: 'WarningBackgroundActive',
						border: 'WarningBorderActive',
					},
					{
						icon: 'WarningIconWeakActive',
						color:  'WarningTextWeakActive',
						background: 'WarningBackgroundStrongActive',
						border: 'WarningBorderActive',
					},
					{
						icon: 'WarningIconActive',
						color:  'WarningTextActive',
						background: 'WarningBackgroundWeakActive',
						border: 'WarningBorderActive',
					},
					{},
					{
						icon: 'BetaIconStrong',
						color:  'BetaTextStrong',
						background: 'BetaBackground',
						border: 'BetaBorder',
					},
					{
						icon: 'BetaIconWeak',
						color:  'BetaTextWeak',
						background: 'BetaBackgroundStrong',
						border: 'BetaBorder',
					},
					{
						icon: 'BetaIcon',
						color:  'BetaText',
						background: 'BetaBackgroundWeak',
						border: 'BetaBorder',
					},
					{},
					{
						icon: 'BetaIconStrong',
						color:  'BetaTextStrong',
						background: 'BetaBackgroundHover',
						border: 'BetaBorder',
					},
					{
						icon: 'BetaIconWeakHover',
						color:  'BetaTextWeakHover',
						background: 'BetaBackgroundStrongHover',
						border: 'BetaBorderHover',
					},
					{
						icon: 'BetaIconHover',
						color:  'BetaTextHover',
						background: 'BetaBackgroundWeakHover',
						border: 'BetaBorderHover',
					},
					{},
					{
						icon: 'BetaIconStrong',
						color:  'BetaTextStrong',
						background: 'BetaBackgroundActive',
						border: 'BetaBorderActive',
					},
					{
						icon: 'BetaIconWeakActive',
						color:  'BetaTextWeakActive',
						background: 'BetaBackgroundStrongActive',
						border: 'BetaBorderActive',
					},
					{
						icon: 'BetaIconActive',
						color:  'BetaTextActive',
						background: 'BetaBackgroundWeakActive',
						border: 'BetaBorderActive',
					},
					{},
					{
						icon: 'AssistiveIcon',
						color:  'AssistiveText',
						background: 'AssistiveBackground',
						border: 'AssistiveBorder',
					},
					{},
					{},
					{},
					{
						background: 'NeutralBackground',
						border: 'AssistiveBorderFocus',
					},
					{
						background: 'NeutralBackgroundMedium',
						border: 'AssistiveBorderFocus',
					},
					{
						background: 'NeutralBackgroundStrong',
						border: 'AssistiveBorderFocus',
					},
					{},
				].map(({icon: iconK, color: colorK, background: backgroundK, border:borderK, withStates}, key) => {
					if (!backgroundK) {
						return <div />;
					}
					const icon = tokens.find(token => token.name.endsWith(iconK));
					const iconHover = tokens.find(token => token.name.endsWith(`${iconK}Hover`));
					const iconActive = tokens.find(token => token.name.endsWith(`${iconK}Active`));
					const color = tokens.find(token => token.name.endsWith(colorK));
					const colorHover = tokens.find(token => token.name.endsWith(`${colorK}Hover`));
					const colorActive = tokens.find(token => token.name.endsWith(`${colorK}Active`));
					const background = tokens.find(token => token.name.endsWith(backgroundK));
					const border = tokens.find(token => token.name.endsWith(borderK));
					return (
						<div
							key={key}
							className={S.colorBackground}
							style={{
								color: `${color?.value}`,
								background: `${background?.value}`,
								borderColor: `${border?.value}`
							}}
						>
							<small>{getDisplayName(background?.name)}</small>
							<div className={S.colorContent}>
													<span
														className={S.colorIcon}
														style={{
															background: `${icon?.value}`
														}}
													/><small>{getDisplayName(icon?.name)}</small>
								<span
									className={S.colorText}
								><small>{getDisplayName(color?.name)}</small>
        </span>
							</div>
							{withStates && <>
							<div className={S.colorContent} style={{ color: colorHover?.value}}>
													<span
														className={S.colorIcon}
														style={{
															background: `${iconHover?.value}`
														}}
													/><small>{getDisplayName(iconHover?.name)}</small>
								<span
									className={S.colorText}
								><small>{getDisplayName(colorHover?.name)}</small>
        </span>
							</div>
							<div className={S.colorContent} style={{ color: colorActive?.value}}>
													<span
														className={S.colorIcon}
														style={{
															background: `${iconActive?.value}`
														}}
													/><small>{getDisplayName(iconActive?.name)}</small>
								<span
									className={S.colorText}
								><small>{getDisplayName(colorActive?.name)}</small>
        </span>
							</div>
                      </>}
							<small>{getDisplayName(border?.name)}</small>
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

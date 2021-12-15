// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import {ColorToken, Dictionary, Token, TokenType } from '../types';

import S from './Tokens.scss';

type TokensProps = React.PropsWithChildren<any> & {
	filter: string;
	tokens: Dictionary;
};

type PropsWithToken = {
	// eslint-disable-next-line react/no-unused-prop-types
	token: Token;
};

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
	const nameArray = name.replace('coral', '').split(/(?=[A-Z])/);
	return nameArray
		.map((word: string, index: number, words: string[]) => {
			let adapted = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'limit'].some(
				size => word.toLocaleLowerCase() === size,
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

const getCssName = (name: string) => {
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
				style={{
					width: '100%',
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
				className={S.image}
				style={{
					height: '100%',
					width: '5rem',
					background: token.value,
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}}
			/>
		)}
	</DefinitionListTokens>
);

const BreakpointTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<hr
				style={{
					width: token.value,
					borderColor: 'hsla(359,100%,71%,1)',
				}}
			/>
		)}
	</DefinitionListTokens>
);

const ColorTokens = ({ tokens, filter }: TokensProps) => {
	return (
		<>
			{['neutral', 'accent', 'danger', 'warning', 'success', 'assistive', 'beta', 'charts'].map(
				category => {
					return Object.entries(
						tokens
							.filter((token: Token) =>
								token.name.toLocaleLowerCase().startsWith(`coralcolor${category}`),
							)
							.reduce(
								(acc:Record<string, Token[]>, curr: Token) => {
									const nameArr = curr.name.split(/(?=[A-Z])/);
									const path = nameArr.splice(4, nameArr.length).join('');
									acc[`${category}${path}`] = (acc[`${category}${path}`] || []).concat([curr]);
									return acc;
								},
								{},
							),
					)
						.sort((a,b) => a[0].localeCompare(b[0]))
						.map(([name, values], key) => {
						// console.log(name, values);

						const icon = (values as ColorToken[]).find(token => token.name.includes('Icon'));
						const color = (values as ColorToken[]).find(token => token.name.includes('Text'));
						const background = (values as ColorToken[]).find(token => token.name.includes('Background'));
						const border = (values as ColorToken[]).find(token => token.name.includes('Border'));

						return (
							<dl key={key}>
								{(!filter.length || name.toLocaleLowerCase().includes(filter.toLocaleString())) && [
								<dt>{getDisplayName(name)}</dt>,
								<dd>
									<figure>
										<div style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
											padding: '1rem',
											width: '100%',
											color: color?.value || 'transparent',
											background: background?.value || 'transparent',
											border: `solid ${border?.value || 'transparent'}`,
											borderRadius: '4px'
										}}
										>
											<span style={{
												display: 'inline-block',
												height: '2rem',
												width: '2rem',
												background: icon?.value || 'currentColor',
												borderRadius: '50%',
											}}
											/>
											<span>text</span>
										</div>
										<figcaption>
											<dl>
												{icon && <div>
													<dt>{getCssName(icon.name)}</dt>
													<dd>{icon.hex}</dd>
                     </div>}
												{color && <div>
													<dt>{getCssName(color.name)}</dt>
													<dd>{color.hex}</dd>
                      </div>}
												{background && <div>
													<dt>{getCssName(background.name)}</dt>
													<dd>{background.hex}</dd>
                           </div>}
												{border && <div>
													<dt>{getCssName(border.name)}</dt>
													<dd>{border.hex}</dd>
                       </div>}
											</dl>
										</figcaption>
									</figure>
								</dd>
                                                                                           ]}
							</dl>
						);
					});
				},
			)}
		</>
	);
};

const GradientTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				style={{
					height: '5rem',
					width: '100%',
					background: token.value,
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}}
			/>
		)}
	</DefinitionListTokens>
);

const RadiusTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				style={{
					height: '100%',
					width: '5rem',
					background: '#EFEFEF',
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
				style={{
					height: '5rem',
					width: '5rem',
					background: '#EFEFEF',
					borderRadius: '4px',
					boxShadow: token.value,
				}}
			/>
		)}
	</DefinitionListTokens>
);
export const MeasureTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				style={{
					height: '100%',
					width: token.value,
					background: '#EFEFEF',
				}}
			/>
		)}
	</DefinitionListTokens>
);
export const OpacityTokens = ({ tokens, filter }: TokensProps) => (
	<DefinitionListTokens filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				style={{
					height: '1rem',
					background: '#EFEFEF',
				}}
			>
				<div
					style={{
						height: '1rem',
						opacity: token.value,
						background: 'hsla(359,100%,71%,1)',
					}}
				>
					Lorem ipsum
				</div>
			</div>
		)}
	</DefinitionListTokens>
);
export const TypographyTokens = ({ tokens, filter }: TokensProps) => (
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

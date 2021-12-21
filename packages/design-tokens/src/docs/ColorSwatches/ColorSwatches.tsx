// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import { ColorToken, TokenType } from '../../types';
import { TokensProps } from '../TokensTypes';

import ColorCompositions from './data/ColorSwatches.json';

import TokenSkeleton from '../TokenSkeleton';
import ColorSwatch from './ColorSwatch';

import { getDisplayName, groupBy } from '../TokenFormatter';

import TokenName from '../TokenName';

import S from './ColorSwatches.scss';

type ColorComposition = {
	icon?: string;
	color?: string;
	background: string;
	border: string;
};

const SemanticColors = ['Accent', 'Danger', 'Warning', 'Success', 'Beta'];

const ColorTokens = ({ tokens, ...rest }: React.HTMLAttributes<HTMLDivElement> & TokensProps) => {
	const [filter, setFilter] = React.useState('');

	const colorTokens = tokens
		.filter((t: ColorToken) => t.type === TokenType.COLOR)
		.reduce((acc: Record<string, ColorToken>, curr: ColorToken) => {
			acc[curr.name.replace('coralColor', '')] = curr;
			return acc;
		}, {});

	const neutralColorsGroupedByBackground = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.border?.toLocaleLowerCase().startsWith('neutral'),
		),
		'background',
	);

	const semanticColors = ColorCompositions.filter(
		(t: ColorComposition) => !t.border?.toLocaleLowerCase().startsWith('neutral'),
	);

	const shouldDisplay = React.useCallback(
		tks => {
			return (
				!filter.length ||
				tks.some(
					(c: ColorToken) =>
						getDisplayName(c?.name).toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
						c?.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
						c?.hex.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
				)
			);
		},
		[filter, colorTokens],
	);

	return (
		<div {...rest}>
			<input
				aria-label="Search for a color composition"
				type="search"
				onChange={e => setFilter(e.currentTarget.value)}
			/>
			<div className={S.colorGrid}>
				{Object.entries(neutralColorsGroupedByBackground).map(([background, tks], key) => {
					return (
						<div className={S.colorSwatch} key={key}>
							<dl
								className={S.colorBackground}
								style={{
									background: `${colorTokens[background].value}`,
								}}
							>
								<TokenName token={colorTokens[background]} />
								{tks.map((t, i) => {
									const icon = colorTokens[t.icon || ''];
									const color = colorTokens[t.color || ''];
									const bg = colorTokens[background];
									const border = colorTokens[t.border];
									return shouldDisplay([icon, color, bg, border]) ? (
										<ColorSwatch
											key={i}
											icon={icon}
											color={color}
											background={bg}
											border={border}
										/>
									) : (
										<TokenSkeleton />
									);
								})}
							</dl>
						</div>
					);
				})}
				{semanticColors.map(
					(
						{
							icon: iconK = '',
							color: colorK = '',
							background: backgroundK = '',
							border: borderK = '',
						},
						key,
					) => {
						const hasSemanticColor = SemanticColors.some(semanticColor =>
							colorK?.includes(semanticColor),
						);
						const hasSemanticBackground = SemanticColors.some(semanticColor =>
							backgroundK?.includes(semanticColor),
						);
						const isNewBackgroundColor =
							backgroundK.split(/(?=[A-Z])/)[0] !==
							semanticColors[key - 1]?.background.split(/(?=[A-Z])/)[0];

						return (
							<div
								key={key}
								className={S.colorSwatch}
								style={isNewBackgroundColor ? { gridColumnStart: 1 } : {}}
							>
								{(hasSemanticBackground ? ['DEFAULT', 'HOVER', 'ACTIVE'] : ['DEFAULT']).map(
									(state, appendix) => {
										let iconColor = colorTokens[iconK];
										let textColor = colorTokens[colorK];
										let backgroundColor = colorTokens[backgroundK];
										let borderColor = colorTokens[borderK];

										switch (state) {
											case 'HOVER':
												iconColor = colorTokens[`${iconK}Hover`];
												textColor = colorTokens[`${colorK}Hover`];
												backgroundColor = colorTokens[`${backgroundK}Hover`];
												borderColor = colorTokens[`${borderK}Hover`];
												break;
											case 'ACTIVE':
												iconColor = colorTokens[`${iconK}Active`];
												textColor = colorTokens[`${colorK}Active`];
												backgroundColor = colorTokens[`${backgroundK}Active`];
												borderColor = colorTokens[`${borderK}Active`];
												break;
											default:
												break;
										}

										return shouldDisplay([iconColor, textColor, backgroundColor, borderColor]) ? (
											<dl
												key={`${key}${appendix}`}
												className={S.colorBackground}
												style={{
													color: `${textColor?.value}`,
													background: `${backgroundColor?.value}`,
													borderColor: `${borderColor?.value}`,
												}}
											>
												<TokenName token={backgroundColor} />
												<ColorSwatch
													icon={iconColor}
													color={textColor}
													background={backgroundColor}
												/>
												{hasSemanticColor && !hasSemanticBackground && (
													<>
														<ColorSwatch
															icon={colorTokens[`${iconK}Hover`]}
															color={colorTokens[`${colorK}Hover`]}
															background={backgroundColor}
														/>
														<ColorSwatch
															icon={colorTokens[`${iconK}Active`]}
															color={colorTokens[`${colorK}Active`]}
															background={backgroundColor}
														/>
													</>
												)}{' '}
												<TokenName token={borderColor} />
											</dl>
										) : (
											<TokenSkeleton />
										);
									},
								)}
							</div>
						);
					},
				)}
			</div>
		</div>
	);
};
export default ColorTokens;

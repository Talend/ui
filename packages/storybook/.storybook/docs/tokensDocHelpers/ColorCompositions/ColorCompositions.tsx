// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

import { StackVertical, TabsKit } from '@talend/design-system';
import { ColorToken, Token, TokenType } from '../../../../src/tokens/types';
import { TokensProps } from '../TokensTypes';

import ColorCompositions from './data/ColorCompositions.json';

import { groupBy } from '../TokenFormatter';
import CompositionListItem from '../components/CompositionList/CompositionListItem';

type ColorComposition = {
	icon?: string;
	color?: string;
	background: string;
	border: string;
};

const SemanticColors = ['Accent', 'Danger', 'Warning', 'Success', 'Beta'];

const ColorTokens = ({ tokens, ...rest }: React.HTMLAttributes<HTMLDivElement> & TokensProps) => {
	const colorTokens = tokens
		.filter((t: Token) => [TokenType.COLOR, TokenType.GRADIENT].includes(t.type))
		.reduce((acc: Record<string, ColorToken>, curr: ColorToken) => {
			acc[curr.name.replace('coral', '').replace('Color', '').replace('Gradient', '')] = curr;
			return acc;
		}, {});

	const neutralBackgroundsGroup = groupBy(
		ColorCompositions.filter(
			(t: ColorComposition) =>
				t.background?.toLocaleLowerCase().startsWith('neutral') ||
				t.background?.toLocaleLowerCase().startsWith('branding'),
		),
		'background',
	);

	const accentBackgroundsGroup = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.background?.toLocaleLowerCase().startsWith('accent'),
		),
		'background',
	);

	const successBackgroundsGroup = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.background?.toLocaleLowerCase().startsWith('success'),
		),
		'background',
	);

	const dangerBackgroundsGroup = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.background?.toLocaleLowerCase().startsWith('danger'),
		),
		'background',
	);

	const warningBackgroundsGroup = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.background?.toLocaleLowerCase().startsWith('warning'),
		),
		'background',
	);

	const betaBackgroundsGroup = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.background?.toLocaleLowerCase().startsWith('beta'),
		),
		'background',
	);

	const assistiveBackgroundsGroup = groupBy(
		ColorCompositions.filter((t: ColorComposition) =>
			t.background?.toLocaleLowerCase().startsWith('assistive'),
		),
		'background',
	);

	const semanticColors = {
		Neutral: neutralBackgroundsGroup,
		Accent: accentBackgroundsGroup,
		Success: successBackgroundsGroup,
		Danger: dangerBackgroundsGroup,
		Warning: warningBackgroundsGroup,
		Beta: betaBackgroundsGroup,
		Assistive: assistiveBackgroundsGroup,
	};

	return (
		<div {...rest}>
			<TabsKit>
				<StackVertical gap="L" justify="stretch" align="stretch">
					<TabsKit.TabList>
						<>
							{Object.keys(semanticColors).map(keyTitle => {
								return (
									<TabsKit.Tab size="L" key={keyTitle}>
										{keyTitle}
									</TabsKit.Tab>
								);
							})}
						</>
					</TabsKit.TabList>

					{Object.values(semanticColors).map(group => {
						return (
							<TabsKit.TabPanel key={Object.keys(group)[0]}>
								<StackVertical gap="M" align="stretch" justify="stretch">
									{Object.entries(group).map(([background, tks], key) => {
										return (
											<StackVertical
												gap="M"
												align="stretch"
												justify="stretch"
												key={`${background}-${key}`}
											>
												<CompositionListItem
													background={background}
													tokens={tks}
													tokenCodex={colorTokens}
												/>
												{colorTokens[`${background}Hover`] && (
													<CompositionListItem
														background={`${background}Hover`}
														tokens={tks}
														tokenCodex={colorTokens}
													/>
												)}
												{colorTokens[`${background}Active`] && (
													<CompositionListItem
														background={`${background}Active`}
														tokens={tks}
														tokenCodex={colorTokens}
													/>
												)}
											</StackVertical>
										);
									})}
								</StackVertical>
							</TabsKit.TabPanel>
						);
					})}
				</StackVertical>
			</TabsKit>
		</div>
	);
};
export default ColorTokens;

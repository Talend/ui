import React from 'react';

import { ColorToken, Token, TokenType } from '../../types';
import { TokensProps } from '../TokensTypes';

import TokensDefinitionListItem from '../TokensDefinitionListItem';
import ColorChart from './ColorChart';

import S from '../ColorCompositions/ColorCompositions.scss';

const DefaultCharts = ['Neutral', 'Default'];

const SemanticCharts = ['Success', 'Warning', 'Danger'];

const OrderedCharts = [
	'Color00',
	'Color01',
	'Color02',
	'Color03',
	'Color04',
	'Color05',
	'Color06',
	'Color07',
	'Color08',
	'Color09',
];

const ColorCharts = ({ tokens }: TokensProps) => {
	const colorTokens = tokens
		.filter((t: Token) => t.type === TokenType.COLOR)
		.reduce((acc: Record<string, ColorToken>, curr: ColorToken) => {
			acc[curr.name.replace('coralColor', '')] = curr;
			return acc;
		}, {});
	return [DefaultCharts, SemanticCharts, OrderedCharts].map(charts =>
		charts.map((name, key) => {
			if (name.length === 0) return <div />;
			const chartColorWeak = colorTokens[`Charts${name}Weak`];
			const chartColorStrong = colorTokens[`Charts${name}Strong`];
			const chartColor = colorTokens[`Charts${name}`];
			const isNewArray = key === 0;
			return (
				<div
					className={S.colorBackground}
					key={key}
					style={isNewArray ? { gridColumnStart: 1 } : {}}
				>
					<ColorChart
						chartColorWeak={chartColorWeak}
						chartColor={chartColor}
						chartColorStrong={chartColorStrong}
					/>
					<dl>
						<TokensDefinitionListItem token={chartColorWeak}>
							{({ token }: { token: ColorToken }) => (
								<div className={S.colorText} style={{ background: token?.value }} />
							)}
						</TokensDefinitionListItem>
						<TokensDefinitionListItem token={chartColorStrong}>
							{({ token }: { token: ColorToken }) => (
								<div className={S.colorText} style={{ background: token?.value }} />
							)}
						</TokensDefinitionListItem>
						<TokensDefinitionListItem token={chartColor}>
							{({ token }: { token: ColorToken }) => (
								<div className={S.colorText} style={{ background: token?.value }} />
							)}
						</TokensDefinitionListItem>
					</dl>
				</div>
			);
		}),
	);
};

export default ColorCharts;

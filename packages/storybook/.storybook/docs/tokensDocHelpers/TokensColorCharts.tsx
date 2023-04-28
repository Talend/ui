import { ColorToken, Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import { StackVertical } from '@talend/design-system';

import ColorScale from './components/DefinitionList/ColorScale/ColorScale';
import DefinitionListCharts from './components/DefinitionList/DefinitionListCharts';

import styles from './components/DefinitionList/DefinitionList.module.scss';

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

const TokensColorCharts = ({ tokens }: TokensProps) => {
	const colorTokens = tokens
		.filter((t: Token) => t.type === TokenType.COLOR)
		.reduce((acc: Record<string, ColorToken>, curr: ColorToken) => {
			acc[curr.name.replace('coralColor', '')] = curr;
			return acc;
		}, {});
	return (
		<StackVertical gap="XL" align="stretch">
			{[DefaultCharts, SemanticCharts, OrderedCharts].map(charts =>
				charts.map((name, key) => {
					const chartColorWeak = colorTokens[`Charts${name}Weak`];
					const chartColorStrong = colorTokens[`Charts${name}Strong`];
					const chartColor = colorTokens[`Charts${name}`];
					const colorName = `Color${name.split('Color').join('-')}`;
					return (
						<StackVertical
							gap="L"
							align="stretch"
							key={key}
							margin={{ top: 0, bottom: 'L', right: 0, left: 0 }}
						>
							<h2 className={styles.title}>{colorName}</h2>
							<ColorScale tokens={[chartColorWeak, chartColor, chartColorStrong]} />
							<DefinitionListCharts tokens={[chartColorWeak, chartColor, chartColorStrong]} />
						</StackVertical>
					);
				}),
			)}
		</StackVertical>
	);
};

export default TokensColorCharts;

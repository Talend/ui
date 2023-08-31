import { ColorToken, Token, TokenType } from '../../../src/tokens/types';
import { getDisplayName } from './TokenFormatter';
import { TokensProps } from './TokensTypes';
import DefinitionListColors from './components/DefinitionList/DefinitionListColors';

const colorOrder = [
	'neutral',
	'accent',
	'info',
	'success',
	'warning',
	'danger',
	'beta',
	'assistive',
	'branding',
	'charts',
];

const TokensColor = ({ tokens }: TokensProps<ColorToken>) => (
	<DefinitionListColors
		tokens={tokens
			.filter((t: Token) => t.type === TokenType.COLOR)
			.sort((tokenA: ColorToken, tokenB: ColorToken) => {
				const tokenAColor = getDisplayName(tokenA.name).split('/')[0];
				const tokenBColor = getDisplayName(tokenB.name).split('/')[0];
				return colorOrder.indexOf(tokenAColor) - colorOrder.indexOf(tokenBColor);
			})}
	/>
);

export default TokensColor;

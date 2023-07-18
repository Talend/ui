import { ColorToken, Token, TokenType } from '../../../src/tokens/types';
import { getDisplayName } from './TokenFormatter';
import { TokensProps } from './TokensTypes';
import DefinitionListTypography from './components/DefinitionList/DefinitionListTypography';

const colorOrder = ['heading', 'paragraph', 'data'];

const TokensTypography = ({ tokens }: TokensProps<ColorToken>) => (
	<DefinitionListTypography
		tokens={tokens
			.filter((t: Token) => t.type === TokenType.TYPOGRAPHY)
			.sort((tokenA: ColorToken, tokenB: ColorToken) => {
				const tokenAColor = getDisplayName(tokenA.name).split('/')[0];
				const tokenBColor = getDisplayName(tokenB.name).split('/')[0];
				return colorOrder.indexOf(tokenAColor) - colorOrder.indexOf(tokenBColor);
			})}
	/>
);

export default TokensTypography;

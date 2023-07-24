import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListGradient from './components/DefinitionList/DefinitionListGradient';

const TokensGradient = ({ tokens }: TokensProps) => (
	<DefinitionListGradient tokens={tokens.filter((t: Token) => t.type === TokenType.GRADIENT)} />
);

export default TokensGradient;

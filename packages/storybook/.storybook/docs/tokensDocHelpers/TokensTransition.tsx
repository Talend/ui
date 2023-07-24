import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListTransition from './components/DefinitionList/DefinitionListTransition';

const TokensTransition = ({ tokens }: TokensProps) => (
	<DefinitionListTransition tokens={tokens.filter((t: Token) => t.type === TokenType.TRANSITION)} />
);

export default TokensTransition;

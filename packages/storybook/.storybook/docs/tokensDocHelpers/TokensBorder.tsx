import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListBorder from './components/DefinitionList/DefinitionListBorder';

const BorderTokens = ({ tokens }: TokensProps) => (
	<DefinitionListBorder tokens={tokens.filter((t: Token) => t.type === TokenType.BORDER)} />
);

export default BorderTokens;

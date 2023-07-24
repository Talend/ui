import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';

import DefinitionListShadow from './components/DefinitionList/DefinitionListShadow';

const TokensShadow = ({ tokens }: TokensProps) => (
	<DefinitionListShadow tokens={tokens.filter((t: Token) => t.type === TokenType.SHADOW)} />
);

export default TokensShadow;

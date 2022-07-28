import React from 'react';

import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListBranding from './components/DefinitionList/DefinitionListBranding';

const BrandingTokens = ({ tokens }: TokensProps) => (
	<DefinitionListBranding tokens={tokens.filter((t: Token) => t.type === TokenType.BRANDING)} />
);
export default BrandingTokens;

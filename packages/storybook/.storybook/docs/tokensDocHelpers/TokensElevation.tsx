import React from 'react';

import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListElevation from './components/DefinitionList/DefinitionListElevation';

const ElevationTokens = ({ tokens }: TokensProps) => (
	<DefinitionListElevation tokens={tokens.filter((t: Token) => t.type === TokenType.ELEVATION)} />
);

export default ElevationTokens;

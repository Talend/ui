import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '../../../../../src';
import DefinitionListItemTransition from './DefinitionListItem/DefinitionListItemTransition';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="L">
			<StackVertical as="dl" gap="L">
				{tokens.map((token: Token, index: number) => (
					<DefinitionListItemTransition key={`${token.name}-${index}`} token={token} />
				))}
			</StackVertical>
		</StackVertical>
	);
};

export default TokensDefinitionList;

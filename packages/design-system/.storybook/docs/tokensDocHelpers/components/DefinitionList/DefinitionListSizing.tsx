import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '../../../../../src';
import DefinitionListItemSizing from './DefinitionListItem/DefinitionListItemSizing';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="L" align="stretch" justify="stretch">
			<StackVertical as="dl" gap="S">
				{tokens.map((token: Token, index: number) => (
					<DefinitionListItemSizing key={`${token.name}-${index}`} token={token} />
				))}
			</StackVertical>
		</StackVertical>
	);
};

export default TokensDefinitionList;

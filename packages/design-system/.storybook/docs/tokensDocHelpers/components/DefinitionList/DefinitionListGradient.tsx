import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '../../../../../src';
import DefinitionListItemColor from './DefinitionListItem/DefinitionListItemColor';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="L">
			<StackVertical as="dl" gap="L">
				{tokens.map((token: Token, index: number) => (
					<DefinitionListItemColor key={`${token.name}-${index}`} token={token} />
				))}
			</StackVertical>
		</StackVertical>
	);
};

export default TokensDefinitionList;

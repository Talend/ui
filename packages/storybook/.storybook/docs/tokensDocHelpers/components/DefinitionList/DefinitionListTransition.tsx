import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '@talend/design-system';
import DefinitionListItemTransition from './DefinitionListItem/DefinitionListItemTransition';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="L">
			<StackVertical gap="L">
				{tokens.map((token: Token, index: number) => (
					<DefinitionListItemTransition key={`${token.name}-${index}`} token={token} />
				))}
			</StackVertical>
		</StackVertical>
	);
};

export default TokensDefinitionList;

import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '@talend/design-system';
import DefinitionListItemBranding from './DefinitionListItem/DefinitionListItemBranding';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="L">
			<StackVertical gap="L">
				{tokens.map((token: Token, index: number) => (
					<DefinitionListItemBranding key={`${token.name}-${index}`} token={token} />
				))}
			</StackVertical>
		</StackVertical>
	);
};

export default TokensDefinitionList;

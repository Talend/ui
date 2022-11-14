import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '@talend/design-system';
import DefinitionListItemCharts from './DefinitionListItem/DefinitionListItemCharts';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="S">
			{tokens.map((token: Token, index: number) => (
				<DefinitionListItemCharts key={`${token.name}-${index}`} token={token} />
			))}
		</StackVertical>
	);
};

export default TokensDefinitionList;

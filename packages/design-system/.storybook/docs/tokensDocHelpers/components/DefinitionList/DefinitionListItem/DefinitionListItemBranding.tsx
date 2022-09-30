import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import CardBranding from '../../Card/CardBranding';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemBranding({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardBranding value={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemBranding;

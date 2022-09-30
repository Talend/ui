import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import DefinitionListItem from './DefinitionListItem';
import CardRadius from '../../Card/CardRadius';

function DefinitionListItemShadow({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardRadius value={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemShadow;

import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import DefinitionListItem from './DefinitionListItem';
import CardElevation from '../../Card/CardElevation';

function DefinitionListItemElevation({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardElevation elevation={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemElevation;

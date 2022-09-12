import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import CardSpacing from '../../Card/CardSpacing';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemSpacing({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardSpacing padding={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemSpacing;

import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import CardTypography from '../../Card/CardTypography';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemTypography({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardTypography font={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemTypography;

import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemSizing({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return <DefinitionListItem token={token} />;
}

export default DefinitionListItemSizing;

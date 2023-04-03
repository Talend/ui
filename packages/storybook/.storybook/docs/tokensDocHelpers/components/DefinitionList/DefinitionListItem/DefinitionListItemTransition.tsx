import { Token } from '../../../../../../src/tokens/types';
import DefinitionListItem from './DefinitionListItem';
import CardTransition from '../../Card/CardTransition';

function DefinitionListItemTransition({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardTransition transition={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemTransition;

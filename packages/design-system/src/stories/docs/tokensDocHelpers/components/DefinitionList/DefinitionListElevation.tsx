import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '@talend/design-system';
import DefinitionListItemElevation from './DefinitionListItem/DefinitionListItemElevation';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	return (
		<StackVertical gap="L">
			<StackVertical gap="S">
				{tokens.map((token: Token, index: number) => (
					<DefinitionListItemElevation key={`${token.name}-${index}`} token={token} />
				))}
			</StackVertical>
		</StackVertical>
	);
};

export default TokensDefinitionList;

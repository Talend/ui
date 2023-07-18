import { StackVertical, TabsKit } from '@talend/design-system';

import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListSizing from './components/DefinitionList/DefinitionListSizing';
import DefinitionListSpacing from './components/DefinitionList/DefinitionListSpacing';
import SizingScale from './components/DefinitionList/SizingScale/SizingScale';

const TokensMeasure = ({ tokens }: TokensProps) => {
	const spacingTokens = tokens.filter(
		(t: Token) => t.type === TokenType.MEASURE && t.name.includes('Spacing'),
	);
	const sizingTokens = tokens.filter(
		(t: Token) => t.type === TokenType.MEASURE && t.name.includes('Sizing'),
	);

	return (
		<StackVertical gap="L" align="stretch" justify="stretch">
			<TabsKit>
				<TabsKit.TabList>
					<TabsKit.Tab size="L" id="spacing">
						Spacing
					</TabsKit.Tab>
					<TabsKit.Tab size="L" id="sizing">
						Sizing
					</TabsKit.Tab>
				</TabsKit.TabList>

				<TabsKit.TabPanel id="spacing">
					<DefinitionListSpacing tokens={spacingTokens} />
				</TabsKit.TabPanel>

				<TabsKit.TabPanel id="sizing">
					<StackVertical gap="L" align="stretch">
						<SizingScale tokens={sizingTokens} />
						<DefinitionListSizing tokens={sizingTokens} />
					</StackVertical>
				</TabsKit.TabPanel>
			</TabsKit>
		</StackVertical>
	);
};

export default TokensMeasure;

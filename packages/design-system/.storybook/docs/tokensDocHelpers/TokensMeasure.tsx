import React from 'react';

import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import { StackVertical, TabsKit } from '../../../src';
import DefinitionListSpacing from './components/DefinitionList/DefinitionListSpacing';
import SizingScale from './components/DefinitionList/SizingScale/SizingScale';
import DefinitionListSizing from './components/DefinitionList/DefinitionListSizing';

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
					<TabsKit.Tab size="L">Spacing</TabsKit.Tab>
					<TabsKit.Tab size="L">Sizing</TabsKit.Tab>
				</TabsKit.TabList>

				<TabsKit.TabPanel>
					<DefinitionListSpacing tokens={spacingTokens} />
				</TabsKit.TabPanel>

				<TabsKit.TabPanel>
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

import { StackHorizontal, StackVertical } from '@talend/design-system';
import TokenDefinition from './Tokens-definition.png';

export default function WhatAreTokens() {
	return (
		<StackHorizontal
			gap="XL"
			justify="spaceBetween"
			align="start"
			margin={{ top: 0, bottom: 'L', left: 0, right: 0 }}
		>
			<StackVertical gap="M">
				<p>
					Design tokens are the foundations of a strong Design System — they are «the visual atoms
					of the Design System». Tokens are a set of <strong>visual properties</strong> such as
					colors, sizes, shadows, animations...
				</p>

				<p>
					Ours are using a <strong>semantic</strong> nomenclature instead of a simple description.
					That way, they create a common language not depending on the component type or the
					platform where it lives. It ensures developers and designers speak the same language.
					Tokens make it easier to build our product by improving communication and design-to-code
					handoff, enforcing a logical approach behind every design decisions they can target.
				</p>
			</StackVertical>
			<img
				src={TokenDefinition}
				alt="This graph shows that for one token name, depending on a theme, the value can be different"
				width="464px"
			/>
		</StackHorizontal>
	);
}

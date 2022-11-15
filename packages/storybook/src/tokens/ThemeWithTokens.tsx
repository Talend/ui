import React, { useState } from 'react';
import {
	EmptyStateLarge,
	InlineMessageInformation,
	ButtonIconFloating,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

import styles from './ThemeWithTokens.module.scss';

export default function ThemeWithTokens() {
	const [isDark, setDark] = useState(false);
	return (
		<StackVertical
			gap="XL"
			margin={{ top: 0, bottom: 'L', left: 0, right: 0 }}
			align="center"
			justify="center"
		>
			<StackVertical gap="M" align="center">
				<p>
					With Design Tokens, themes are much easier to handle. Each token is purely semantic, its
					value is dependent on a theme file - a stylesheet assigning a value to that semantic name.
				</p>
				<p>
					When you implement a component using tokens, you are guaranteed that this component will
					support any theme. To get different themes to take effect, simply load the correct
					stylesheet and update the <code>data-theme</code> attribute and you’re done.
				</p>
			</StackVertical>
			<StackHorizontal gap="M" align="center" justify="center">
				<div data-theme={isDark ? 'dark' : 'light'}>
					<div className={styles.card}>
						<StackVertical gap="M" justify="stretch" align="stretch">
							<StackHorizontal gap="M" justify="spaceBetween" align="center">
								<InlineMessageInformation
									withBackground
									title="Theme switching"
									description="Click on the icon button to see theme switching in action"
								/>
								<ButtonIconFloating icon="refresh" onClick={() => setDark(!isDark)}>
									Switch themes
								</ButtonIconFloating>
							</StackHorizontal>
							<p>
								With tokens, designing and implementing once works for every possible theme.
								Components built with tokens are resilient.
							</p>
							<EmptyStateLarge
								title="Illustrations as well"
								description="It's easier for everybody"
								action={{ actionType: 'button', children: 'It really is', onClick: () => {} }}
							/>
						</StackVertical>
					</div>
				</div>
			</StackHorizontal>
		</StackVertical>
	);
}

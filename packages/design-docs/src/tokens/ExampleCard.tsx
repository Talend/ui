import { useState } from 'react';
import {
	EmptyStateLarge,
	InlineMessageInformation,
	ButtonIconFloating,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

import styles from './ExampleCard.module.scss';

export default function ExampleCard() {
	const [isDark, setDark] = useState(false);
	return (
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
	);
}

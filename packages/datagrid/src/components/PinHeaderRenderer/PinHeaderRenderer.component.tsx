import theme from './PinHeaderRenderer.scss';
import { ButtonIcon } from '@talend/design-system';
import React from 'react';

export type PinHeaderRendererProps = Omit<Parameters<typeof ButtonIcon>[0], 'size' | 'icon'>;

export default function PinHeaderRenderer(props: PinHeaderRendererProps): JSX.Element {
	return (
		<div className={theme['td-pin-header']}>
			<ButtonIcon icon="talend-ellipsis" size="S" {...props} />
		</div>
	);
}

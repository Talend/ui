import React from 'react';
import { ButtonIcon } from '@talend/design-system';
import theme from './PinHeaderRenderer.scss';

export const PIN_HEADER_RENDERER_COMPONENT = 'pinHeaderRenderer';

export type PinHeaderRendererProps = Omit<Parameters<typeof ButtonIcon>[0], 'size' | 'icon'>;

export default function PinHeaderRenderer(props: PinHeaderRendererProps): JSX.Element {
	return (
		<div className={theme['td-pin-header']}>
			<ButtonIcon icon="talend-ellipsis" size="S" {...props} />
		</div>
	);
}

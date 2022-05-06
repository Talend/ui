import React from 'react';
import { ButtonIcon } from '@talend/design-system';
import classNames from 'classnames';
import theme from './PinHeaderRenderer.scss';

export const PIN_HEADER_RENDERER_COMPONENT = 'pinHeaderRenderer';

export type DefaultPinHeaderRendererProps = Omit<Parameters<typeof ButtonIcon>[0], 'size' | 'icon'>;

export default function DefaultPinHeaderRenderer(
	props: DefaultPinHeaderRendererProps,
): JSX.Element {
	return (
		<div className={classNames(theme['td-pin-header'], 'td-pin-header')}>
			<ButtonIcon icon="talend-ellipsis" size="S" {...props} />
		</div>
	);
}

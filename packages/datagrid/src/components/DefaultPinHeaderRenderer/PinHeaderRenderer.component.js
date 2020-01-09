import React from 'react';
import classNames from 'classnames';
import { Icon } from '@talend/react-components';

import theme from './PinHeaderRenderer.scss';

export const PIN_HEADER_RENDERER_COMPONENT = 'pinHeaderRenderer';

export default function DefaultPinHeaderRenderer() {
	return (
		<div className={classNames(theme['td-pin-header'], 'td-pin-header')}>
			<Icon name="talend-burger" />
		</div>
	);
}

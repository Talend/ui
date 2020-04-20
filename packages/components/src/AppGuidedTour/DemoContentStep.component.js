import React from 'react';
import Icon from '../Icon';
import Stepper from '../Stepper';
import { getI18nInstance } from '../translate';

import theme from './DemoContentStep.scss';

const i18n = getI18nInstance();

export default function DemoContentStep({ demoContentSteps }) {
	if (!demoContentSteps.length) {
		return null;
	}

	return (
		<>
			<p className={theme.info}>
				<Icon name="talend-info-circle" />
				{i18n.t('tui-components:DEMO_CONTENT_LOADING_MESSAGE', {
					defaultValue:
						'Loading may take a few minutes to complete. Bear with us. Content is loading. Isn\'t it time for tea or coffee?',
				})}
			</p>
			<Stepper steps={demoContentSteps} />
		</>
	);
}

DemoContentStep.propTypes = {
	demoContentSteps: Stepper.propTypes.steps.isRequired,
};

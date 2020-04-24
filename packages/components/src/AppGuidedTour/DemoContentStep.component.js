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
		<React.Fragment>
			<p className={theme.info}>
				{i18n.t('tui-components:DEMO_CONTENT_LOADING_MESSAGE', {
					defaultValue:
						"Loading may take a few minutes to complete.\nIsn't it time for tea or coffee?",
				})}
			</p>
			<Stepper steps={demoContentSteps} />
		</React.Fragment>
	);
}

DemoContentStep.propTypes = {
	demoContentSteps: Stepper.propTypes.steps.isRequired,
};

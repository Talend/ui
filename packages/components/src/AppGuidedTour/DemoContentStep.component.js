import React from 'react';
import { useTranslation } from 'react-i18next';
import Stepper from '../Stepper';
import I18N_DOMAIN_COMPONENTS from '../constants';

import theme from './DemoContentStep.scss';

export default function DemoContentStep({ demoContentSteps }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	if (!demoContentSteps.length) {
		return null;
	}

	return (
		<React.Fragment>
			<p className={theme.info}>
				{t('DEMO_CONTENT_LOADING_MESSAGE', {
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

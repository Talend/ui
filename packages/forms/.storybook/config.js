import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { I18nextProvider } from 'react-i18next';

import '@talend/bootstrap-theme/src/theme/theme.scss';
import i18n from '../stories/config/i18n';

function loadStories() {
	require('../stories-core');
}

const withFormLayout = (story, options) => {
	if (options.kind === 'Layout') {
		return story();
	}
	return (
		<I18nextProvider i18n={i18n}>
			<div className="container-fluid">
				<IconsProvider />
				<nav
					style={{ position: 'fixed', bottom: 0, width: '100vw', textAlign: 'center', zIndex: 1 }}
				>
					<div className="btn-group">
						<button className="btn" onClick={() => i18n.changeLanguage('en')}>
							Default (en)
						</button>
						<button className="btn" onClick={() => i18n.changeLanguage('fr')}>
							fr
						</button>
						<button className="btn" onClick={() => i18n.changeLanguage('it')}>
							it
						</button>
					</div>
				</nav>
				<div
					className="col-md-offset-1 col-md-10"
					style={{ marginTop: '20px', marginBottom: '20px' }}
				>
					{story()}
				</div>
			</div>
		</I18nextProvider>
	);
};

addDecorator(withA11y);
addDecorator(withFormLayout);
configure(loadStories, module);

import { storiesOf, configure, setAddon } from '@kadira/storybook';
import cmf from 'react-storybook-cmf';
import infoAddon from '@kadira/react-storybook-addon-info';
import mock from 'react-cmf/lib/mock';
import examples from '../examples';

setAddon(infoAddon);
setAddon({ addWithCMF: cmf.addWithCMF });


function loadStories() {
	Object.keys(examples).forEach((example) => {
		const state = mock.state();
		state.cmf.settings.views.appheaderbar = {
			app: 'Hello Test',
			logo: {
				src: 'https://www.talend.com/sites/all/themes/talend_responsive/images/talend-logo.png',
				alt: 'Talend logo',
				style: { maxWidth: '100px' },
			},
		};
		storiesOf(example)
			.addWithCMF('Default', examples[example], {
				state,
			});
	});
}

configure(loadStories, module);

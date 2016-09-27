import { storiesOf, configure, setAddon } from '@kadira/storybook';
import cmf from 'react-storybook-cmf';
import infoAddon from '@kadira/react-storybook-addon-info';
import examples from '../examples';

setAddon(infoAddon);
setAddon({ addWithCMF: cmf.addWithCMF });

function loadStories() {
	Object.keys(examples).forEach((example) => {
		storiesOf(example)
			.addWithCMF('Default', examples[example]);
	});
}

configure(loadStories, module);

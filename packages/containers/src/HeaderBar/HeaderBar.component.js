import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { HeaderBar as PureHeaderBar } from '@talend/react-components';
import Action from '../Action';

function HeaderBar(props) {
	const renderers = {
		Action,
	};
	return <PureHeaderBar renderers={renderers} {...props} />;
}

export default cmfConnect({})(HeaderBar);

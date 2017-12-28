import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { HeaderBar as PureHeaderBar } from '@talend/react-components';

import Action from '../Action';
import ActionDropdown from '../ActionDropdown';
import getRenderers from '../renderers';

const renderers = {
	Action,
	ActionDropdown,
};

function HeaderBar(props) {
	return <PureHeaderBar renderers={getRenderers(renderers)} {...props} />;
}

export default cmfConnect({})(HeaderBar);

import redirect from './redirect.js';
import cmf from '@talend/react-cmf';

function recordCmfAction(event, data) {
	return cmf.actions.collections.addOrReplace('playground.cmf.lastAction', {
		message: data.message,
	});
}

export default {
	'playground.cmf.recordAction': recordCmfAction,
	redirect,
};

import React from 'react';
import PropTypes from 'prop-types';

import HeaderTitle from '../HeaderTitle';
import { Actions } from '../Actions';
import Inject from '../Inject';

export default function RichTitle(props) {
	const Renderers = Inject.getAll(props.getComponent, {
		Actions,
	});

	return [<HeaderTitle title={props.title} />, <Renderers.Actions actions={props.right} />];
}

RichTitle.propTypes = {
	getComponent: PropTypes.func,
	title: PropTypes.string,
	right: PropTypes.array,
};

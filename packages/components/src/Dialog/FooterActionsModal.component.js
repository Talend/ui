import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import { Action, Actions } from '../Actions';

function FooterActionsModal(props) {
	const { footer } = props;
	if (!footer) {
		return null;
	}

	const actions = ['left', 'middle', 'right'].map(side => (
		<div>{footer[side] ? <Actions actions={footer[side]} /> : null}</div>
	));

	return <Modal.Footer>{actions}</Modal.Footer>;
}

FooterActionsModal.propTypes = {
	footer: PropTypes.shape({
		left: PropTypes.arrayOf(Action),
		middle: PropTypes.arrayOf(Action),
		right: PropTypes.arrayOf(Action),
	}),
};

export default FooterActionsModal;

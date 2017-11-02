import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import IconModal from './IconModal.component';
import DescriptionModal from './DescriptionModal.component';
import FooterActionsModal from './FooterActionsModal.component';
import { Action } from '../Actions';

function transformFooterProps(props) {
	let footer = {};

	if (props.action) {
		footer.right = [props.action];
	} else {
		footer = props.footer;
	}

	return footer;
}
/**
 * @param {object} props react props
 * @example
<Dialog name="Hello world"></Dialog>
 */
function Dialog(props) {
	const modalProps = { bsSize: props.size, show: props.show, ...props.bsDialogProps };

	return (
		<Modal {...modalProps}>
			{props.header && (
				<Modal.Header closeButton>
					<IconModal icon={props.icon} />
					<div>
						<h5 className="modal-title">{props.header}</h5>
						<DescriptionModal description={props.description} />
					</div>
				</Modal.Header>
			)}
			<Modal.Body>{props.children}</Modal.Body>
			<FooterActionsModal footer={transformFooterProps(props)} />
		</Modal>
	);
}

Dialog.propTypes = {
	...DescriptionModal.propTypes,
	...IconModal.propTypes,
	header: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large']),
	children: PropTypes.element,
	show: PropTypes.bool,
	action: PropTypes.shape(Action.propTypes),
	bsDialogProps: PropTypes.shape({ ...Modal.propTypes, manager: PropTypes.object }),
};

export default Dialog;

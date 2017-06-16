import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import Action from '../Actions/Action';

/**
 * @param {object} props react props
 * @example
<Dialog name="Hello world"></Dialog>
 */
function Dialog({ size, show, bsDialogProps, header, children, action, bodyOverflow = true }) {
	const modalProps = { bsSize: size, show, ...bsDialogProps };
	return (
		<Modal {...modalProps} className={bodyOverflow && 'modal-body-overflow'}>
			{header &&
				<Modal.Header closeButton>
					<Modal.Title>{header}</Modal.Title>
				</Modal.Header>}
			<Modal.Body>
				{children}
			</Modal.Body>
			{action &&
				<Modal.Footer>
					<Action {...action} />
				</Modal.Footer>}
		</Modal>
	);
}

Dialog.propTypes = {
	header: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large']),
	children: PropTypes.element,
	show: PropTypes.bool,
	action: PropTypes.shape(Action.propTypes),
	bsDialogProps: PropTypes.shape({ ...Modal.propTypes, manager: PropTypes.object }),
	bodyOverflow: PropTypes.bool,
};

export default Dialog;

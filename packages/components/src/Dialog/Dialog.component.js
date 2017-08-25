import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import Action from '../Actions/Action';

/**
 * @param {object} props react props
 * @example
<Dialog name="Hello world"></Dialog>
 */
function Dialog(props) {
	const modalProps = { bsSize: props.size, show: props.show, ...props.bsDialogProps };
	return (
		<Modal {...modalProps} >
			{props.header && (
				<Modal.Header closeButton>
					<Modal.Title>{props.header}</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body>
				{props.children}
			</Modal.Body>
			{props.action && (
				<Modal.Footer>
					<Action {...props.action} />
				</Modal.Footer>
			)}
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
};

export default Dialog;

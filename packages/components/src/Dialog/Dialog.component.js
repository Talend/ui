import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import Action from '../Actions/Action';

/**
 * @param {object} props react props
 * @example
<Dialog name="Hello world"></Dialog>
 */
function Dialog(props) {
	return (
		<Modal bsSize={props.size} show={props.show} onHide={props.onHide}>
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
	onHide: PropTypes.func,
};

export default Dialog;

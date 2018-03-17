import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import Action from '../Actions/Action';
import ActionBar from '../ActionBar';
import Inject from '../Inject';
import Progress from '../Progress';

/**
 * @param {object} props react props
 * @example
<Dialog name="Hello world"></Dialog>
 */
function Dialog(props) {
	const modalProps = { bsSize: props.size, show: props.show, ...props.bsDialogProps };
	const Renderers = Inject.getAll(props.getComponent, {
		ActionBar,
		Action,
	});
	return (
		<Modal keyboard={props.keyboard} {...modalProps}>
			{props.header && (
				<Modal.Header closeButton={props.closeButton}>
					<Modal.Title>{props.header}</Modal.Title>
				</Modal.Header>
			)}
			{props.progress && <Progress contained {...props.progress} />}
			<Modal.Body>{props.children}</Modal.Body>
			{props.action && (
				<Modal.Footer>
					<Renderers.Action {...props.action} />
				</Modal.Footer>
			)}
			{props.actionbar && (
				<Modal.Footer>
					<Renderers.ActionBar {...props.actionbar} />
				</Modal.Footer>
			)}
			{props.footer && <Modal.Footer {...props.footer} />}
		</Modal>
	);
}

Dialog.displayName = 'Dialog';

Dialog.defaultProps = {
	closeButton: true,
};

Dialog.propTypes = {
	header: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large']),
	children: PropTypes.element,
	show: PropTypes.bool,
	action: PropTypes.shape(Action.propTypes),
	bsDialogProps: PropTypes.shape({ ...Modal.propTypes, manager: PropTypes.object }),
	footer: PropTypes.object,
	actionbar: PropTypes.object,
	closeButton: PropTypes.bool,
	keyboard: PropTypes.bool,
	getComponent: PropTypes.func,
	progress: PropTypes.object,
};

export default Dialog;

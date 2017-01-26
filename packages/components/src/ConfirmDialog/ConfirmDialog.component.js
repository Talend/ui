import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { ProgressBar, Modal } from 'react-bootstrap';
import theme from './ConfirmDialog.scss';
import Action from '../Actions/Action';

/**
 *
 * @param size optional, allow to change the size of the model ( small / large )
 * @param show allow to show the modal
 * @param header optional, set the text property for the header
 * @param children react's components children
 * @param validateAction object, describe the validate action
 * @param cancelAction object, describe the cancel action
 * @param progressValue number, if set shows progressbar with progress of progressValue
 *
 const defaultProps = {
	header: 'Hello world',
	show: true,
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
	},
};
 const children = (<div>BODY content. You can put what ever you want here</div>);
 <ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
 * @constructor
 */
function ConfirmDialog({
	size,
	show,
	header,
	children,
	validateAction,
	cancelAction,
	progressValue,
}) {
	return (
		<Modal
			bsSize={size}
			show={show}
			keyboard
			className={classNames(theme['tc-confirm-dialog'])}
		>
			{header ? (
				<Modal.Header closeButton={false} className={classNames(theme['modal-header'])}>
					<Modal.Title>{header}</Modal.Title>
				</Modal.Header>
			) : null}
			<Modal.Body>
				{progressValue ? (<ProgressBar now={progressValue} />) : null}
				{children}
			</Modal.Body>
			<Modal.Footer className={classNames(theme['modal-footer'])}>
				<Action {...cancelAction} />
				<Action {...validateAction} />
			</Modal.Footer>
		</Modal>

	);
}

ConfirmDialog.propTypes = {
	header: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large']),
	children: PropTypes.element,
	show: PropTypes.bool,
	cancelAction: PropTypes.shape(Action.propTypes).isRequired,
	validateAction: PropTypes.shape(Action.propTypes).isRequired,
	progressValue: PropTypes.number,
};

export default ConfirmDialog;

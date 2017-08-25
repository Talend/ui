import PropTypes from 'prop-types';
import React from 'react';
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
 * @param bodyOverflow bool, default true,
 * modal body automaticaly show a scrollbar if content overflow
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
	secondaryActions,
	cancelAction,
	progressValue,
	bodyOverflow = true,
}) {
	return (
		<Modal
			bsSize={size}
			show={show}
			keyboard
			className={classNames(
				theme['tc-confirm-dialog'],
				bodyOverflow && theme['modal-body-overflow'],
			)}
		>
			{header
				? <Modal.Header closeButton={false}>
					<Modal.Title>{header}</Modal.Title>
				</Modal.Header>
				: null}
			{progressValue ? <ProgressBar now={progressValue} /> : null}
			<Modal.Body>
				{children}
			</Modal.Body>
			<Modal.Footer>
				<Action {...cancelAction} />
				<div className={theme['tc-confirm-actions']}>
					{secondaryActions && secondaryActions.map((props, i) => <Action {...props} key={i} />)}
					<Action {...validateAction} />
				</div>
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
	secondaryActions: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	progressValue: PropTypes.number,
	bodyOverflow: PropTypes.bool,
};

export default ConfirmDialog;

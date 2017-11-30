import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { ProgressBar, Modal } from 'react-bootstrap';

import IconModal from '../Dialog/IconModal.component';
import DescriptionModal from '../Dialog/DescriptionModal.component';
import FooterActionsModal from '../Dialog/FooterActionsModal.component';
import theme from './ConfirmDialog.scss';
import Action from '../Actions/Action';

function transformFooterProps(props) {
	let footer = {
		left: [],
		right: [],
	};

	if (props.cancelAction) {
		footer.left.push(props.cancelAction);
	}

	if (props.secondaryActions) {
		footer.right = footer.right.concat(props.secondaryActions);
	}

	if (props.validateAction) {
		footer.right.push(props.validateAction);
	}

	if (props.footer) {
		footer = props.footer;
	}

	return footer;
}
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
function ConfirmDialog(props) {
	const {
		bodyOverflow = true,
		children,
		description,
		header,
		icon,
		progressValue,
		show,
		size,
	} = props;
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
			{header ? (
				<Modal.Header closeButton={false}>
					<IconModal icon={icon} />
					<div>
						<h5 className="modal-title">{header}</h5>
						<DescriptionModal description={description} />
					</div>
				</Modal.Header>
			) : null}
			{progressValue ? <ProgressBar now={progressValue} /> : null}
			<Modal.Body>{children}</Modal.Body>
			<FooterActionsModal footer={transformFooterProps(props)} />
		</Modal>
	);
}

ConfirmDialog.propTypes = {
	...DescriptionModal.propTypes,
	...IconModal.propTypes,
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

import PropTypes from 'prop-types';
import React from 'react';
import Dialog from '../Dialog';
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
	children,
	validateAction,
	secondaryActions,
	cancelAction,
	progressValue,
	...props
}) {
	const actions = {
		left: [],
		center: [],
		right: [],
	};
	if (cancelAction) {
		actions.left.push(cancelAction);
	}
	if (secondaryActions) {
		actions.right = actions.right.concat(secondaryActions);
	}
	if (validateAction) {
		actions.right.push(validateAction);
	}
	let progress;
	if (progressValue) {
		progress = { percent: progressValue };
	}
	return (
		<Dialog
			progress={progress}
			closeButton={false}
			actionbar={{ actions }}
			children={children}
			keyboard
			{...props}
		/>
	);
}

ConfirmDialog.displayName = 'ConfirmDialog';
ConfirmDialog.defaultValue = {
	secondaryActions: [],
};

ConfirmDialog.propTypes = {
	header: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large']),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	show: PropTypes.bool,
	cancelAction: PropTypes.shape(Action.propTypes).isRequired,
	validateAction: PropTypes.shape(Action.propTypes).isRequired,
	secondaryActions: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	progressValue: PropTypes.number,
	bodyOverflow: PropTypes.bool,
	getComponent: PropTypes.func,
};

export default ConfirmDialog;

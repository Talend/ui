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
<Dialog header="Hello world">content</Dialog>
 */
function Dialog({
	action,
	actionbar,
	children,
	closeButton,
	components,
	footer,
	getComponent,
	header,
	progress,
	size,
	...props
}) {
	const Renderers = Inject.getAll(getComponent, {
		ActionBar,
		Action,
	});
	const injected = Inject.all(getComponent, components);

	const headerId = 'tc-dialog-header';
	const a11yProps = {
		role: 'dialog',
		'aria-modal': true,
	};
	if (header) {
		a11yProps['aria-labelledby'] = headerId;
	}

	return (
		// we disable jsx-a11y/aria-props because the version we use does not consider it valid (bug)
		// eslint-disable-next-line jsx-a11y/aria-props
		<Modal bsSize={size} {...a11yProps} {...props}>
			{injected('before-modal-header')}
			{header && (
				<Modal.Header closeButton={closeButton}>
					<Modal.Title id={headerId}>{header}</Modal.Title>
				</Modal.Header>
			)}
			{injected('after-modal-header')}
			{progress && <Progress contained {...progress} />}
			{injected('before-modal-body')}
			<Modal.Body>
				{injected('before-children')}
				{children}
				{injected('after-children')}
			</Modal.Body>
			{injected('before-modal-body')}
			{action && (
				<Modal.Footer>
					<Renderers.Action {...action} />
				</Modal.Footer>
			)}
			{actionbar && (
				<Modal.Footer>
					<Renderers.ActionBar {...actionbar} />
				</Modal.Footer>
			)}
			{footer && <Modal.Footer {...footer}>{injected('footer')}</Modal.Footer>}
		</Modal>
	);
}

Dialog.displayName = 'Dialog';

Dialog.defaultProps = {
	closeButton: true,
};

Dialog.propTypes = {
	header: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'small', 'lg', 'large']),
	children: PropTypes.element,
	show: PropTypes.bool,
	action: PropTypes.shape(Action.propTypes),
	footer: PropTypes.object,
	actionbar: PropTypes.object,
	closeButton: PropTypes.bool,
	keyboard: PropTypes.bool,
	getComponent: PropTypes.func,
	components: PropTypes.object,
	progress: PropTypes.object,
};

export default Dialog;

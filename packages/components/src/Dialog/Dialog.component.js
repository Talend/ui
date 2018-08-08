import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classNames from 'classnames';

import './Dialog.scss';

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
	className,
	closeButton,
	components,
	flex,
	footer,
	getComponent,
	header,
	subtitle,
	error,
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
	const subtext = error || subtitle;

	return (
		<Modal
			bsSize={size}
			className={classNames({ 'modal-flex': flex }, className)}
			role="dialog"
			// we disable jsx-a11y/aria-props because the version we use does not consider it valid (bug)
			// eslint-disable-next-line jsx-a11y/aria-props
			aria-modal="true"
			aria-labelledby={header ? headerId : null}
			{...props}
		>
			{injected('before-modal-header')}
			{header && (
				<Modal.Header closeButton={closeButton}>
					<Modal.Title id={headerId}>{header}</Modal.Title>
					{subtext &&
						subtext.length && (
							<h3 className={classNames({ error: error && error.length }, 'modal-subtitle')}>
								{subtext}
							</h3>
						)}
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
	subtitle: PropTypes.string,
	error: PropTypes.string,
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
	flex: PropTypes.bool,
	className: PropTypes.string,
};

export default Dialog;

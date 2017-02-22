import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Label, OverlayTrigger, Panel } from 'react-bootstrap';

import Action from '../Actions/Action';
import Icon from './../Icon/Icon.component';
import Status from '../Status';
import TooltipTrigger from './../TooltipTrigger';

import css from './CollapsiblePanel.scss';

export const TYPE_STATUS = 'status';
export const TYPE_ACTION = 'action';
export const TYPE_BADGE = 'badge';

function getActionHandler(func, item) {
	return function actionHandler(e) {
		e.stopPropagation();
		func(e, item);
	};
}

const displayModes = [TYPE_ACTION, TYPE_BADGE, TYPE_STATUS];

const statusPropTypes = {
	displayMode: PropTypes.oneOf(displayModes),
	...Status.propTypes,
};

const actionPropTypes = {
	displayMode: PropTypes.oneOf(displayModes),
	...Action.propTypes,
};

const simplePropTypes = {
	displayMode: PropTypes.oneOf(displayModes),
	label: PropTypes.string,
	bsStyle: PropTypes.string,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

function renderHeaderItem({ displayMode, ...headerItem }, key) {
	switch (displayMode) {
	case TYPE_STATUS: {
		const { actions, ...restStatus } = headerItem;
		const adaptActions = actions.map(
			action => ({
				...action,
				onClick: getActionHandler(action.onClick, headerItem),
			}),
		);
		return (<Status key={key} actions={adaptActions} {...restStatus} />);
	}
	case TYPE_ACTION: {
		const { onClick, ...restAction } = headerItem;
		return (<Action key={key} onClick={getActionHandler(onClick, headerItem)} {...restAction} />);
	}
	case TYPE_BADGE: {
		const { label, tooltipPlacement, ...rest } = headerItem;
		return (
			<TooltipTrigger key={key} label={label} tooltipPlacement={tooltipPlacement}>
				<Label {...rest}>{label}</Label>
			</TooltipTrigger>
		);
	}
	default: {
		const { label, tooltipPlacement } = headerItem;
		return (
			<TooltipTrigger key={key} label={label} tooltipPlacement={tooltipPlacement}>
				<span>{label}</span>
			</TooltipTrigger>
		);
	}
	}
}
renderHeaderItem.propTypes = PropTypes.oneOfType([
	PropTypes.shape(statusPropTypes),
	PropTypes.shape(actionPropTypes),
	PropTypes.shape(simplePropTypes),
	PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(statusPropTypes),
		PropTypes.shape(actionPropTypes),
		PropTypes.shape(simplePropTypes),
	])),
]);

function renderHeader({ header, caret }) {
	const headerColumnClass = `col-${header.length}`;
	const headerItems = header.map((headerItem, index) => {
		if (Array.isArray(headerItem)) {
			const elements = headerItem.map(renderHeaderItem);
			return (
				<div key={index} className={classNames(css.group, css[headerColumnClass])}>{elements}</div>
			);
		}
		return (
			<div key={index} className={css[headerColumnClass]}>{renderHeaderItem(headerItem)}</div>
		);
	});

	if (caret) {
		headerItems.push(
			<Icon
				key={header.length}
				className={css.caret}
				name={'talend-caret-down'}
			/>,
		);
	}

	return headerItems;
}

/**
 * @param {object} props react props
 * @example
 const props = {
	header: [
		{
			displayMode: 'status',
			status: 'failed',
			label: 'Failed',
			icon: 'fa fa-close',
			actions: [
				{
					label: 'cancel',
					icon: 'fa fa-cancel',
					onClick: action('onCancel'),
				}
			],
		},
		{
			label: 'by Charles',
			bsStyle: 'default',
			tooltipPlacement: 'top',
		},
		{
			displayMode: 'action',
			label: 'edit',
			icon: 'fa fa-edit',
			onClick: action('onEdit'),
			tooltipPlacement: 'right',
			hideLabel: true,
			link: true,
		}
	],
	content: [
		{
			label: 'Content1',
			description: 'Description1',
		},
		{
			label: 'Content2',
			description: 'Description2',
		}

	]
};
 <CollapsiblePanel {...props} />
 */
function CollapsiblePanel({ header, content }) {
	const hasContent = content && content.length;
	const headerItems = renderHeader({ header, caret: hasContent });

	if (hasContent) {
		return (
			<Panel className={css['tc-collapsible-panel']} collapsible header={headerItems}>
				{content.map(
					(item, index) => ((
						<div key={index} className={css.content}>
							<div className={css.label}><Label>{item.label}</Label></div>
							<div className={css.description}>{item.description}</div>
						</div>
						)),
					)}
			</Panel>
		);
	}
	return (<Panel className={`tc-collapsible-panel ${css['tc-panel']}`} header={headerItems} />);
}

CollapsiblePanel.propTypes = {
	header: PropTypes.arrayOf(renderHeaderItem.propTypes).isRequired,
	content: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		description: PropTypes.string,
	})),
};

export default CollapsiblePanel;

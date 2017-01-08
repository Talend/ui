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
export const BADGE_ACTION = 'badge';

const getActionHandler = (func, item) => (e) => {
	e.stopPropagation();
	func(e, item);
};

function renderHeader({ header, caret }) {
	const headerColumnClass = `col-${header.length}`;
	const headerItems = header.map((headerItem, index) => {
		switch (headerItem.displayMode) {
		case TYPE_STATUS: {
			const { actions, ...restStatus } = headerItem;
			const adaptActions = actions.map(
				action => ({
					...action,
					onClick: getActionHandler(action.onClick, headerItem),
				})
			);
			return (
				<div key={index} className={css[headerColumnClass]}>
					<Status actions={adaptActions} {...restStatus} />
				</div>
			);
		}
		case TYPE_ACTION: {
			const { onClick, ...restAction } = headerItem;
			return (
				<div
					key={index}
					className={classNames(css.action, css[headerColumnClass])}
				>
					<Action onClick={getActionHandler(onClick, headerItem)} {...restAction} />
				</div>
			);
		}
		case BADGE_ACTION: {
			const { label, tooltipPlacement, ...rest } = headerItem;
			return (
				<div key={index} className={css[headerColumnClass]}>
					<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
						<Label {...rest}>{label}</Label>
					</TooltipTrigger>
				</div>
			);
		}
		default: {
			const { label, tooltipPlacement, ...rest } = headerItem;
			return (
				<div key={index} className={css[headerColumnClass]}>
					<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
						<span {...rest}>{label}</span>
					</TooltipTrigger>
				</div>
			);
		}
		}
	});

	if (caret) {
		headerItems.push(
			<Icon
				key={header.length}
				className={css.caret}
				name={'talend-caret-down'}
			/>
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
						))
					)}
			</Panel>
		);
	}
	return (<Panel className={css['tc-panel']} header={headerItems} />);
}

CollapsiblePanel.propTypes = {
	header: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape({
			displayMode: PropTypes.oneOf([TYPE_STATUS, TYPE_ACTION]),
			...Status.propTypes,
		}),
		PropTypes.shape({
			displayMode: PropTypes.oneOf([TYPE_STATUS, TYPE_ACTION]),
			...Action.propTypes,
		}),
		PropTypes.shape({
			label: PropTypes.string,
			bsStyle: PropTypes.string,
			tooltipPlacement: OverlayTrigger.propTypes.placement,
		}),
	])).isRequired,
	content: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		description: PropTypes.string,
	})),
};

export default CollapsiblePanel;

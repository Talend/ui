import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Label, OverlayTrigger, Panel, Button } from 'react-bootstrap';
import uuid from 'uuid';

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
	className: PropTypes.string,
	...Status.propTypes,
};

const actionPropTypes = {
	displayMode: PropTypes.oneOf(displayModes),
	className: PropTypes.string,
	...Action.propTypes,
};

const simplePropTypes = {
	displayMode: PropTypes.oneOf(displayModes),
	className: PropTypes.string,
	label: PropTypes.string,
	bsStyle: PropTypes.string,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

function renderHeaderItem({ displayMode, className, ...headerItem }, key) {
	switch (displayMode) {
	case TYPE_STATUS: {
		const { actions, ...restStatus } = headerItem;
		const adaptActions = actions.map(
			action => ({
				...action,
				onClick: getActionHandler(action.onClick, headerItem),
			})
		);
		return (<Status
			key={key}
			actions={adaptActions}
			{...restStatus}
			className={css[className]}
		/>);
	}
	case TYPE_ACTION: {
		const { onClick, ...restAction } = headerItem;
		return (
			<Action
				key={key}
				onClick={getActionHandler(onClick, headerItem)}
				className={css[className]}
				{...restAction}
			/>);
	}
	case TYPE_BADGE: {
		const { label, tooltipPlacement, ...rest } = headerItem;
		return (
			<TooltipTrigger key={key} label={label} tooltipPlacement={tooltipPlacement}>
				<Label {...rest} className={css[className]}>{label}</Label>
			</TooltipTrigger>
		);
	}
	default: {
		const { label, tooltipPlacement } = headerItem;
		return (
			<TooltipTrigger key={key} label={label} tooltipPlacement={tooltipPlacement}>
				<span className={css[className]}>{label}</span>
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

function renderHeader(header, content, onSelect, onToggle) {
	const headerColumnClass = `col-${header.length}`;
	const headerItems = header.map((headerItem, index) => {
		if (Array.isArray(headerItem)) {
			const elements = headerItem.map(renderHeaderItem);
			return (
				<div
					key={index}
					className={classNames(css.group, css[headerColumnClass])}
				>{elements}</div>
			);
		}
		return (
			<div
				key={index}
				className={classNames(css[headerItem.className], css[headerColumnClass])}
			>{renderHeaderItem(headerItem)}</div>
		);
	});

	// Panel component needs an array for header props
	const wrappedHeader = [
		onSelect ? (
			<Button
				className={css['left-btn']}
				bsStyle="link"
				key={1}
				onClick={onSelect}
			>
				<div className={classNames(css['panel-title'], 'panel-title')}>
					{headerItems}
				</div>
			</Button>
		) : (
			<Button
				className={css['left-btn']}
				bsStyle="link"
				key={2}
				onClick={content && onToggle}
			>
				<div className={classNames(css['panel-title'], 'panel-title')}>
					{headerItems}
				</div>
			</Button>
		),
	];

	if (content) {
		const defaultCaret = (
			<Button
				className={css.toggle}
				bsStyle="link"
				key={uuid.v4()}
				onClick={onToggle}
			>
				<Icon
					key={header.length}
					name="talend-caret-down"
				/>
			</Button>
		);
		wrappedHeader.push(defaultCaret);
	}
	return wrappedHeader;
}

function getKeyValueContent(content) {
	return (content.map(
		(item, index) => (
			<dl key={index} className={css.content}>
				<dd className={css.label}><Label>{item.label}</Label></dd>
				<dt className={css.description}>{item.description}</dt>
			</dl>)
	));
}

function getTextualContent(content) {
	return (
		<div className={css.content}>
			<div className={css.upper}>
				{content.upper.map((item, index) => {
					if (typeof item === 'string') {
						return (<span key={index}>{item}</span>);
					}
					const { label, tooltipPlacement } = item;
					return (
						<TooltipTrigger
							key={index}
							label={label}
							tooltipPlacement={tooltipPlacement}
						>
							<span>{label}</span>
						</TooltipTrigger>
					);
				})}
			</div>
			<div className={css['content-description']}>
				{content.description}
			</div>
		</div>
	);
}

function CollapsiblePanel({ header, content, onSelect, onToggle, selected, expanded, theme }) {
	const headerItems = renderHeader(header, content, onSelect, onToggle);
	const className = classNames(
		'panel panel-default',
		css['tc-collapsible-panel'],
		{
			[css['default-panel']]: !theme,
			[css['descriptive-panel']]: theme,
			[css.selected]: selected,
			[css.open]: expanded,
		});

	let children = null;
	if (content) {
		children = Array.isArray(content) ? getKeyValueContent(content) : getTextualContent(content);
	}
	return (
		<div className={className}>
			<div className={classNames(css['panel-heading'], 'panel-heading')}>
				{headerItems}
			</div>
			<Panel
				collapsible={!!content}
				expanded={expanded}
			>
				{children}
			</Panel>
		</div>
	);
}

CollapsiblePanel.propTypes = {
	header: PropTypes.arrayOf(renderHeaderItem.propTypes).isRequired,
	onSelect: PropTypes.func,
	onToggle: PropTypes.func,
	expanded: PropTypes.bool,
	selected: PropTypes.bool,
	content: PropTypes.oneOf([
		PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			description: PropTypes.string,
		})),
		PropTypes.shape({
			upper: PropTypes.arrayOf(PropTypes.shape(simplePropTypes)),
			description: PropTypes.string,
		}),
	]),
};

export default CollapsiblePanel;

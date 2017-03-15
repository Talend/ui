import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Label, OverlayTrigger, Panel, Button } from 'react-bootstrap';
import 'focus-outline-manager';

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

function selectPanel(cb) {
	return function actionHandler(e) {
		e.stopPropagation();
		e.preventDefault();
		cb(e);
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

function renderHeader({ header, caret, onSelect }) {
	const headerColumnClass = `col-${header.length}`;
	const headerItems = header.map((headerItem, index) => {
		if (Array.isArray(headerItem)) {
			const elements = headerItem.map(renderHeaderItem);
			return (
				<Button
					bsStyle="link"
					role="link"
					key={index}
					className={classNames(css.group, css[headerColumnClass])}
					onClick={onSelect && selectPanel(onSelect)}
				>{elements}</Button>
			);
		}
		return (
			<Button
				bsStyle="link"
				role="link"
				key={index}
				className={classNames(css[headerItem.className], css[headerColumnClass])}
				onClick={onSelect && selectPanel(onSelect)}
			>{renderHeaderItem(headerItem)}</Button>
		);
	});

	if (caret) {
		const defaultCaret = (<Icon
			key={header.length}
			className={css.caret}
			name={'talend-caret-down'}
		/>);
		headerItems.push(defaultCaret);
	}
	return headerItems;
}

function getKeyValueContent(content) {
	return (content.map(
		(item, index) => (
			<div key={index} className={css.content}>
				<div className={css.label}><Label>{item.label}</Label></div>
				<div className={css.description}>{item.description}</div>
			</div>)
	));
}

function getTextualContent(content) {
	return (
		<div className={css['vertical-content']}>
			<div className={css['content-upper']}>
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
			<div className={css['content-text']}>
				{content.description}
			</div>
		</div>
	);
}

function CollapsiblePanel({ header, content, onSelect, selected }) {
	const headerItems = renderHeader({ header, caret: content, onSelect });
	const className = classNames(css['collapsible-panel'],
		onSelect && css.selectable,
		selected && css['selected-panel']);
	const noContentClassName = classNames(
		{ [css['tc-selectable-panel']]: onSelect, [css['tc-panel']]: !onSelect },
		selected && css['selected-panel']
	);
	let children = null;
	if (content) {
		children = Array.isArray(content) ? getKeyValueContent(content) : getTextualContent(content);
	}
	return (
		<Panel
			className={content ? className : noContentClassName}
			collapsible={!!content}
			header={headerItems}
		>
			{children}
		</Panel>
	);
}


CollapsiblePanel.propTypes = {
	header: PropTypes.arrayOf(renderHeaderItem.propTypes).isRequired,
	onSelect: PropTypes.func,
	selected: PropTypes.bool,
	content: PropTypes.oneOf([
		PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			description: PropTypes.string,
		})),
		PropTypes.shape({
			upper: PropTypes.Array,
			description: PropTypes.string,
		}),
	]),
};

export default CollapsiblePanel;

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

function selectPanel(cb) {
	return function actionHandler(e) {
		e.stopPropagation();
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
				<div key={index}
					className={classNames(css.group, css[headerColumnClass])}
					onClick={onSelect && selectPanel(onSelect)}
				>{elements}</div>
			);
		}
		return (
			<div key={index}
				className={classNames(css[headerItem.className], css[headerColumnClass])}
				onClick={onSelect && selectPanel(onSelect)}
			>{renderHeaderItem(headerItem)}</div>
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
	// case of Normal panel with key value content
	if (!onSelect) {
		const hasContent = content && content.length;
		const headerItems = renderHeader({ header, caret: hasContent });
		if (hasContent) {
			return (
				<Panel className={css['collapsible-panel']} collapsible header={headerItems}>
					{getKeyValueContent(content)}
				</Panel>
			);
		}
		return (<Panel className={`${css['tc-panel']}`} header={headerItems} />);
	}

	// case of Selectable Panel
	const hasContent = content && content.upper && content.upper.length;
	const headerItems = renderHeader({ header, caret: hasContent, onSelect });
	if (hasContent) {
		const className = classNames(css['collapsible-panel'],
			css.selectable,
			selected && css['selected-panel']);
		return (
			<Panel className={className} collapsible header={headerItems}>
				{getTextualContent(content)}
			</Panel>
		);
	}
	const className = classNames(css['tc-selectable-panel'], selected && css['selected-panel']);
	return (<Panel className={className} header={headerItems} />);
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

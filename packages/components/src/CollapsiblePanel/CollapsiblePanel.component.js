import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Label, OverlayTrigger, Panel, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';

import Action from '../Actions/Action';
import Icon from './../Icon/Icon.component';
import { Status, getbsStyleFromStatus } from '../Status';
import TooltipTrigger from './../TooltipTrigger';
import getDefaultT from '../translate';

import css from './CollapsiblePanel.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';

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
			const statusActions = actions.map(action => ({
				...action,
				onClick: getActionHandler(action.onClick, headerItem),
			}));
			return (
				<Status key={key} actions={statusActions} {...restStatus} className={css[className]} />
			);
		}
		case TYPE_ACTION: {
			const { onClick, ...restAction } = headerItem;
			return (
				<Action
					key={key}
					onClick={getActionHandler(onClick, headerItem)}
					className={css[className]}
					{...restAction}
				/>
			);
		}
		case TYPE_BADGE: {
			const { label, tooltipPlacement, ...rest } = headerItem;
			return (
				<TooltipTrigger key={key} label={label} tooltipPlacement={tooltipPlacement}>
					<Label {...rest} className={css[className]}>
						{label}
					</Label>
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
	PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape(statusPropTypes),
			PropTypes.shape(actionPropTypes),
			PropTypes.shape(simplePropTypes),
		]),
	),
]);

function CollapsiblePanelHeader(props) {
	const { header, content, onSelect, onToggle, expanded, t } = props;
	const headerColumnClass = `col-${header.length}`;
	const headerItems = header.map((headerItem, index) => {
		if (Array.isArray(headerItem)) {
			const elements = headerItem.map(renderHeaderItem);
			return (
				<div key={index} className={classNames(css.group, css[headerColumnClass])}>
					{elements}
				</div>
			);
		}
		return (
			<div key={index} className={classNames(css[headerItem.className], css[headerColumnClass])}>
				{renderHeaderItem(headerItem)}
			</div>
		);
	});

	// Panel component needs an array for header props
	const wrappedHeader = [
		onSelect ? (
			<Button
				className={classNames(css['panel-title'], 'panel-title')}
				bsStyle="link"
				key={1}
				onClick={onSelect}
			>
				<div className={classNames(css['panel-title'], 'panel-title')}>{headerItems}</div>
			</Button>
		) : (
			<div className={classNames(css['panel-title'], 'panel-title')} key={1}>
				{headerItems}
			</div>
		),
	];

	if (content || props.children) {
		const caretText = expanded
			? t('COLLAPSIBLE_PANEL_COLLAPSE', { defaultValue: 'Collapse panel' })
			: t('COLLAPSIBLE_PANEL_EXPAND', { defaultValue: 'Expand panel' });

		const defaultCaret = (
			<Button
				className={classNames(css.toggle, 'toggle')}
				bsStyle="link"
				key={2}
				onClick={onToggle}
				title={caretText}
			>
				<Icon key={header.length} name="talend-caret-down" />
			</Button>
		);
		wrappedHeader.push(defaultCaret);
	}
	return <div className={classNames(css['panel-heading'], 'panel-heading')}>{wrappedHeader}</div>;
}

function getKeyValueContent(content) {
	return (
		<dl className={css.content}>
			{content.map((item, index) => [
				<dt className={css.label} key={`${index}_label`}>
					<Label>{item.label}</Label>
				</dt>,
				<dd className={css.description} key={`${index}_desc`}>
					{item.description}
				</dd>,
			])}
		</dl>
	);
}

function getTextualContent(content) {
	return (
		<div className={css.content}>
			<div className={css.head}>
				{content.head.map((item, index) => {
					const { label, tooltipPlacement, className } = item;
					return (
						<TooltipTrigger key={index} label={label} tooltipPlacement={tooltipPlacement}>
							<span className={className}>{label}</span>
						</TooltipTrigger>
					);
				})}
			</div>
			<div className={classNames(css['content-description'], 'content-description')}>
				{content.description}
			</div>
		</div>
	);
}

/**
 * Show collapsible panels
 * @example
 *
 * @param header required, an array gathering the header elements except the caret
 * @param onSelect optional, on header click callback function
 * @param onToggle optional, on caret click callback function
 * @param expanded optional, defines if the panel should be expanded or not
 * @param theme optional, defines the theme of the collapsible, there is a default theme
 * @param status optional, defines the status of the panel
 * @param content optional, defines the content of the panel's body:
 * if content is an array a key value content list is rendered otherwise it is a textual content
 *
 * @example
 * <CollapsiblePanel {...props} />
 */
function CollapsiblePanel(props) {
	const { content, status, expanded, theme } = props;
	const className = classNames('panel panel-default', css['tc-collapsible-panel'], {
		[css['default-panel']]: !theme,
		[css[theme]]: !!theme,
		[css.open]: expanded,
		[css[getbsStyleFromStatus(status) || status]]: !!status,
		status,
	});

	let children = null;
	if (content) {
		children = Array.isArray(content) ? getKeyValueContent(content) : getTextualContent(content);
	}
	return (
		<div className={className}>
			<CollapsiblePanelHeader {...props} />
			<Panel collapsible={!!content || !!props.children} expanded={expanded}>
				{children}
				{props.children}
			</Panel>
		</div>
	);
}

CollapsiblePanel.displayName = 'CollapsiblePanel';
CollapsiblePanel.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	CollapsiblePanelHeader.propTypes = {
		content: PropTypes.oneOfType([
			PropTypes.arrayOf(
				PropTypes.shape({
					label: PropTypes.string,
					description: PropTypes.string,
				}),
			),
			PropTypes.shape({
				head: PropTypes.arrayOf(PropTypes.shape(simplePropTypes)),
				description: PropTypes.string,
			}),
		]),
		expanded: PropTypes.bool,
		header: PropTypes.arrayOf(renderHeaderItem.propTypes).isRequired,
		onSelect: PropTypes.func,
		onToggle: PropTypes.func,
		t: PropTypes.func.isRequired,
	};

	CollapsiblePanel.propTypes = {
		...CollapsiblePanelHeader.propTypes,
		status: PropTypes.string,
		theme: PropTypes.string,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(CollapsiblePanel);

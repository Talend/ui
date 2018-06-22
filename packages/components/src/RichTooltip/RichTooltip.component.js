import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ActionList, Actions, CircularProgress, FilterBar, Tab, Tabs } from '../../';
import Inject from '../Inject';
import theme from './RichTooltip.scss';

function getActionList(items) {
	if (!items || items.length === 0) {
		return null;
	}

	return <ActionList actions={items} />;
}

function getTooltipTab(tab, index) {
	return (
		<Tab
			key={index}
			eventKey={index}
			title={tab.title}
			className={classNames(theme['tc-tooltip-body-list-tab'], 'tc-tooltip-body-list-tab')}
		>
			{getActionList(tab.items)}
		</Tab>
	);
}

function getFilter(filter) {
	if (!filter) {
		return null;
	}

	return (
		<FilterBar
			className={classNames(theme['tc-tooltip-body-list-filter'], 'tc-tooltip-body-list-filter')}
			{...filter}
		/>
	);
}

export function RichTooltipBodyList(props) {
	return (
		<div
			className={classNames(
				theme['tc-tooltip-body'],
				theme['tc-tooltip-body-list'],
				'tc-tooltip-body',
				'tc-tooltip-body-list',
			)}
		>
			{props.tabs && (
				<Tabs
					defaultActiveKey={0}
					id="tooltip-list-tabs"
					className={classNames(theme['tc-tooltip-body-list-tabs'], 'tc-tooltip-body-list-tabs')}
				>
					{getFilter(props.filter)}
					{props.tabs.map(getTooltipTab)}
				</Tabs>
			)}
			{props.items && getFilter(props.filter)}
			{getActionList(props.items)}
		</div>
	);
}

RichTooltipBodyList.propTypes = {};

export function RichTooltipBody(props) {
	return (
		<div className={classNames(theme['tc-tooltip-body'], 'tc-tooltip-body')}>{props.content}</div>
	);
}

RichTooltipBody.propTypes = {};

export function RichTooltipHeader(props) {
	return (
		<header className={classNames(theme['tc-tooltip-header'], 'tc-tooltip-header')}>
			<h1 title={props.title}>{props.title}</h1>
			<Actions actions={props.right} />
		</header>
	);
}

RichTooltipHeader.propTypes = {
	title: PropTypes.string.isRequired,
	right: PropTypes.array,
};

export function RichTooltipFooter(props) {
	return (
		<footer className={classNames(theme['tc-tooltip-footer'], 'tc-tooltip-footer')}>
			<Actions actions={props.left} />
			<Actions
				className={classNames(theme['tc-tooltip-right-actions'], 'tc-tooltip-right-actions')}
				actions={props.right}
			/>
		</footer>
	);
}

RichTooltipFooter.propTypes = {
	left: PropTypes.array,
	right: PropTypes.array,
};

function getContent(loading, Content) {
	if (!Content) {
		return null;
	}

	if (loading) {
		return (
			<RichTooltip.Body
				content={
					<div className={theme['tc-circular-progress']}>
						<CircularProgress size={'default'} className={theme['tc-circular-progress']} />
					</div>
				}
			/>
		);
	}

	return Content;
}

export default function RichTooltip(props) {
	return (
		<span>
			{Inject.getReactElement(props.getComponent, props.Header)}
			{getContent(props.loading, Inject.getReactElement(props.getComponent, props.Content))}
			{Inject.getReactElement(props.getComponent, props.Footer)}
		</span>
	);
}
// mininuscule
RichTooltip.propTypes = {
	Header: Inject.getReactElement.propTypes,
	Content: Inject.getReactElement.propTypes,
	Footer: Inject.getReactElement.propTypes,
	loading: PropTypes.bool,
};

RichTooltip.Header = RichTooltipHeader;
RichTooltip.Body = RichTooltipBody;
RichTooltip.BodyList = RichTooltipBodyList;
RichTooltip.Footer = RichTooltipFooter;

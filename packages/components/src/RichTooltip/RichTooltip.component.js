import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Actions, CircularProgress } from '../../';
import Inject from '../Inject';
import theme from './RichTooltip.scss';

export function RichTooltipBody(props) {
	return (
		<div
			className={classNames(props.className, {
				[theme['tc-tooltip-body']]: true,
				'tc-tooltip-body': true,
			})}
		>
			{props.content}
		</div>
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

export default class RichTooltip extends React.Component {
	static propTypes = {
		header: Inject.getReactElement.propTypes,
		content: Inject.getReactElement.propTypes,
		footer: Inject.getReactElement.propTypes,
		loading: PropTypes.bool,
	};

	componentWillUnmount() {
		console.log('componentWillUnmount');
		// this.props.onHide();
	}

	componentDidMount() {
		console.log('componentDidMount()');
	}

	render() {
		return (
			<span>
				{Inject.getReactElement(this.props.getComponent, this.props.header)}
				{getContent(
					this.props.loading,
					Inject.getReactElement(this.props.getComponent, this.props.content),
				)}
				{Inject.getReactElement(this.props.getComponent, this.props.footer)}
			</span>
		);
	}
}

RichTooltip.Header = RichTooltipHeader;
RichTooltip.Body = RichTooltipBody;
RichTooltip.Footer = RichTooltipFooter;

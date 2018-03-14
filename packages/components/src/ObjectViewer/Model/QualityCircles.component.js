import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModelItemMenu from './ModelItemMenu.component';
import PieChartButton from '../../PieChartButton';
import theme from './QualityCircles.scss';

function getQualityModels(qualities) {
	let invalidPercentage = qualities && qualities[-1] || 0;
	let emptyPercentage = qualities && qualities[0] || 0;
	let validPercentage = qualities && qualities[1] || 0;
	const total = invalidPercentage + emptyPercentage + validPercentage;
	if (total) {
		invalidPercentage = invalidPercentage / total * 100;
		emptyPercentage = emptyPercentage / total * 100;
		validPercentage = validPercentage / total * 100;
	}
	return {
		invalid: [{ color: 'lightning-yellow', percentage: invalidPercentage }],
		empty: [{ color: 'silver-chalice', percentage: emptyPercentage }],
		valid: [{ color: 'rio-grande', percentage: validPercentage }],
	};
}

class QualityCircle extends React.Component {
	constructor(props) {
		super(props);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onOverlayClose = this.onOverlayClose.bind(this);
	}

	onMenuItemClick() {
		this.overlay.hide();
	}

	/*
	Accessibility : set focus back on the button when overlay is closed
	 */
	onOverlayClose() {
		ReactDOM.findDOMNode(this.button).focus(); // eslint-disable-line react/no-find-dom-node
	}

	render() {
		const { menu, onClick, item, jsonpath, model, type } = this.props;
		return (
			<PieChartButton
				buttonRef={button => { this.button = button; }}
				display={'small'}
				hideLabel
				aria-label={`Open menu for ${type} values (${model[0].percentage} %)`}
				label={`${type} (${model[0].percentage} %)`}
				model={model}
				onClick={onClick && (event => onClick(event, { item, jsonpath, type }))}
				overlayComponent={
					<ModelItemMenu
						menuItems={menu[type]}
						onClose={this.onOverlayClose}
						onMenuItemClick={this.onMenuItemClick}
						item={item}
						jsonpath={jsonpath}
						type={type}
					/>
				}
				overlayRef={overlay => { this.overlay = overlay; }}
			/>
		);
	}
}

QualityCircle.propTypes = {
	onClick: PropTypes.func,
	item: PropTypes.object,
	jsonpath: PropTypes.string,
	menu: PropTypes.shape({
		invalid: ModelItemMenu.propTypes.menuItems,
		empty: ModelItemMenu.propTypes.menuItems,
		valid: ModelItemMenu.propTypes.menuItems,
	}),
	model: PropTypes.array,
	type: PropTypes.oneOf(['invalid', 'empty', 'valid']),
};

export default function QualityCircles({ item, jsonpath, quality }) {
	const {
		key = '@talend-quality@',
		onClick,
		menu,
	} = quality;

	if (!item[key]) {
		return null;
	}

	const { invalid, empty, valid } = getQualityModels(item[key]);

	return (
		<div className={classNames(theme.quality, 'tc-object-model-quality')}>
			<QualityCircle
				onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={invalid}
				type={'invalid'}
			/>
			<QualityCircle onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={empty} type={'empty'} />
			<QualityCircle onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={valid} type={'valid'} />
		</div>
	);
}
QualityCircles.propTypes = {
	item: PropTypes.object, // TODO
	jsonpath: PropTypes.string,
	quality: PropTypes.shape({
		key: PropTypes.string,
		onClick: PropTypes.func,
	}),
};

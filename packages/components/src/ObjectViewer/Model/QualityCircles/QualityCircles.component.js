import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModelItemMenu from '../ModelMenus/ModelItemMenu.component';
import PieChartButton from '../../../PieChartButton';
import theme from './QualityCircles.scss';

function evalPercentage(value, total) {
	if (total) {
		return value / total * 100;
	}
	return value;
}

function getQuality(qualities, index) {
	return (qualities && qualities[index]) || 0;
}

function getQualityModels(qualities) {
	const invalidPercentage = getQuality(qualities, -1);
	const emptyPercentage = getQuality(qualities, 0);
	const validPercentage = getQuality(qualities, 1);
	const total = invalidPercentage + emptyPercentage + validPercentage;
	return {
		invalid: [{ color: 'lightning-yellow', percentage: evalPercentage(invalidPercentage, total) }],
		empty: [{ color: 'silver-chalice', percentage: evalPercentage(emptyPercentage, total) }],
		valid: [{ color: 'rio-grande', percentage: evalPercentage(validPercentage, total) }],
	};
}

class QualityCircle extends React.Component {
	constructor(props) {
		super(props);
		this.onClickItemMenu = this.onClickItemMenu.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onClickItemMenu() {
		this.overlay.hide();
	}

	onClose() {
		this.props.onCloseOverlay(this.button);
	}

	render() {
		const { menu, onClick, item, jsonpath, model, type } = this.props;
		return (
			<PieChartButton
				buttonRef={button => {
					this.button = button;
				}}
				display="small"
				hideLabel
				aria-label={`Open menu for ${type} values (${model[0].percentage} %)`}
				label={`${type} (${model[0].percentage} %)`}
				model={model}
				onClick={onClick && (event => onClick(event, { item, jsonpath, type }))}
				overlayComponent={
					<ModelItemMenu
						menuItems={menu[type]}
						onClose={this.onClose}
						onClickItemMenu={this.onClickItemMenu}
						item={item}
						jsonpath={jsonpath}
						type={type}
					/>
				}
				overlayRef={overlay => {
					this.overlay = overlay;
				}}
			/>
		);
	}
}

QualityCircle.propTypes = {
	onCloseOverlay: PropTypes.func.isRequired,
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

export default function QualityCircles({ item, jsonpath, quality, ...rest }) {
	const { key = '@talend-quality@', onClick, menu } = quality;

	if (!item[key]) {
		return null;
	}
	const { invalid, empty, valid } = getQualityModels(item[key]);
	return (
		<div className={classNames(theme['tc-quality'], 'tc-quality')}>
			<QualityCircle
				onClick={onClick}
				menu={menu}
				item={item}
				jsonpath={jsonpath}
				model={invalid}
				type="invalid"
				{...rest}
			/>
			<QualityCircle
				onClick={onClick}
				menu={menu}
				item={item}
				jsonpath={jsonpath}
				model={empty}
				type="empty"
				{...rest}
			/>
			<QualityCircle
				onClick={onClick}
				menu={menu}
				item={item}
				jsonpath={jsonpath}
				model={valid}
				type="valid"
				{...rest}
			/>
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

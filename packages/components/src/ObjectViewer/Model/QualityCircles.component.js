import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

function QualityCircle({ menu, onClick, ...props }) {
	const model = props.model;
	const QualityMenu = menu;
	return (
		<PieChartButton
			display={'small'}
			hideLabel
			onClick={onClick && (event => onClick(event, props))}
			overlayComponent={QualityMenu && <QualityMenu {...props} />}
			label={`${model[0].percentage} %`}
			model={model}
		/>
	);
}
QualityCircle.propTypes = {
	onClick: PropTypes.func,
	menu: PropTypes.element,
	model: PropTypes.object,
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
			<QualityCircle onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={invalid} type={'invalid'} />
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

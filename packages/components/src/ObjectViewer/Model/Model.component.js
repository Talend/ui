import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../../Icon';
import PieChartButton from '../../PieChartButton';
import getJSONPath from '../jsonPath';
import theme from './Model.scss';

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

function QualityCircles({ item, jsonPath, quality }) {
	const {
		key = '@talend-quality@',
		onClick,
	} = quality;
	const { invalid, empty, valid } = getQualityModels(item[key]);
	function rClick(e, info) {
		e.preventDefault();
		e.stopPropagation();
		onClick(e, { ...info, jsonPath, item });
	}

	return (
		<div className={classNames(theme.quality, 'tc-object-model-quality')}>
			<PieChartButton display={'small'} onClick={rClick} hideLabel model={invalid} />
			<PieChartButton display={'small'} onClick={rClick} hideLabel model={empty} />
			<PieChartButton display={'small'} onClick={rClick} hideLabel model={valid} />
		</div>
	);
}
QualityCircles.propTypes = {
	item: PropTypes.object, // TODO
	jsonPath: PropTypes.string,
	quality: PropTypes.shape({
		key: PropTypes.string,
		onClick: PropTypes.func,
	}),
};

function Caret({ data, jsonPath, onToggle, isOpened }) {
	const iconName = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const iconTransform = isOpened ? null : 'rotate-180';

	return (
		<Icon
			name={iconName}
			transform={iconTransform}
			className={theme.caret}
			onClick={e => {
				e.preventDefault();
				e.stopPropagation();
				onToggle(e, { data, isOpened, jsonPath });
			}}
		/>
	);
}
Caret.propTypes = {
	data: PropTypes.any,
	isOpened: PropTypes.bool,
	jsonPath: PropTypes.string,
	onToggle: PropTypes.func,
};

function Item({ item, jsonPath, quality, opened, ...props }) {
	const isOpened = opened.indexOf(jsonPath) !== -1;
	const type = item.type && (item.type.dqType || item.type.type);
	const onClick = props.onSelect && (event => props.onSelect(event, jsonPath, item));

	return (
		<button
			className={classNames(theme.item, 'tc-object-model-item')}
			onClick={onClick}
		>
			<div>
				<div>
					{item.fields &&
						<Caret
							data={props.data}
							isOpened={isOpened}
							jsonPath={props.jsonPath}
							onToggle={props.onToggle}
						/>
					}
					{item.doc}
					{type && <span className={theme.type}>({type})</span>}
				</div>
				<QualityCircles item={item} quality={quality} jsonPath={jsonPath} />
			</div>
		</button>
	);
}
Item.propTypes = {
	item: PropTypes.shape({
		// TODO
	}),
	jsonPath: PropTypes.string,
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
};

export default function Model({ className, style, ...props }) {
	return (
		<div className={classNames(theme.model, 'tc-object-model', className)} style={style}>
			{
				props.data &&
				props.data.map((item, index) =>
					<Item key={index} {...props} jsonPath={getJSONPath(index, '', 'array')} item={item} />
				)
			}
		</div>
	);
}
Model.defaultProps = {
	data: [],
	quality: {},
	opened: [],
};
Model.propTypes = {
	className: PropTypes.string,
	data: PropTypes.arrayOf(Item.propTypes.item).isRequired,
	opened: PropTypes.arrayOf(PropTypes.string),
	quality: QualityCircles.propTypes.quality,
	style: PropTypes.object,
};

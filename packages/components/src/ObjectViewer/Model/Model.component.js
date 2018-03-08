import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../../Icon';
import PieChartButton from '../../PieChartButton';
import getJSONPath from '../jsonPath';
import theme from './Model.scss';

const paddingLeft = 30;
const marginLeft = 3;

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

function QualityCircles({ item, jsonpath, quality }) {
	const {
		key = '@talend-quality@',
		onClick,
	} = quality;

	if (!item[key]) {
		return null;
	}

	const { invalid, empty, valid } = getQualityModels(item[key]);
	function rClick(e, info) {
		onClick(e, { ...info, jsonpath, item });
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
	jsonpath: PropTypes.string,
	quality: PropTypes.shape({
		key: PropTypes.string,
		onClick: PropTypes.func,
	}),
};

function Caret({ data, jsonpath, onToggle, isOpened }) {
	const iconName = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const iconTransform = isOpened ? null : 'rotate-180';

	return (
		<Icon
			name={iconName}
			transform={iconTransform}
			className={theme.caret}
			onClick={e => {
				onToggle(e, { data, isOpened, jsonpath });
			}}
		/>
	);
}
Caret.propTypes = {
	data: PropTypes.any,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	onToggle: PropTypes.func,
};

function Item(props) {
	const { data, item, jsonpath, level, onSelect, onToggle, opened, quality } = props;
	const isOpened = opened.indexOf(jsonpath) !== -1;
	const type = item.type && (item.type.dqType || item.type.type);
	const onClick = onSelect && (event => onSelect(event, jsonpath, item));

	const spaceAdjustment = {
		marginLeft: marginLeft * level,
		paddingLeft: ((paddingLeft * level) || paddingLeft),
	};

	return (
		<li className={classNames(theme.item, 'tc-object-model-item')}>
			<div className={theme.title} style={spaceAdjustment}>
				{item.fields &&
					<Caret
						data={data}
						isOpened={isOpened}
						jsonpath={jsonpath}
						onToggle={onToggle}
					/>
				}
				<button onClick={onClick} className={theme.main}>
					{item.doc}
					{type && <span className={theme.type}>({type})</span>}
				</button>
			</div>
			<QualityCircles item={item} quality={quality} jsonpath={jsonpath} />
			{item.fields && isOpened &&
				<ul className={classNames(theme.fields, 'tc-object-model-item-fields')}>
					{
						item.fields.map((field, index) =>
							<Item
								key={index}
								{...props}
								jsonpath={getJSONPath(index, jsonpath, 'array')}
								item={field}
								level={level + 1}
							/>
						)
					}
				</ul>
			}
		</li>
	);
}
Item.propTypes = {
	item: PropTypes.shape({
		// TODO
	}),
	jsonpath: PropTypes.string,
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
};

export default function Model({ className, style, ...props }) {
	return (
		<ul className={classNames(theme.model, 'tc-object-model', className)} style={style}>
			{
				props.data &&
				props.data.map((item, index) =>
					<Item key={index} {...props} jsonpath={getJSONPath(index, '', 'array')} item={item} level={0} />
				)
			}
		</ul>
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
